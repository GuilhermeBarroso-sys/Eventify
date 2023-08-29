import { Request, Response } from "express";
import { CreateEventUseCase } from "./CreateEventUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";

class CreateEventController {
	constructor(private createEventUseCase : CreateEventUseCase) {}
	async handle(request: Request, response: Response) { 
		const {user} = request;

		const schema = z.object({
			id: z.string().uuid("The id param should be an UUID").optional(),
			name: z.string().nonempty().trim(),
			description: z.string().nonempty().trim(),
			tags: z.string().trim().optional(),
			price: z.number().or(z.string().regex(/\d+/).transform(Number))
				.refine((n) => n >= 0),
			amount: z.number().int().or(z.string().regex(/\d+/).transform(Number))
				.refine(n => n >= 0),
				
			event_date: z.string(),
			image_url: z.any().optional()
		});
    
		const validation = schema.safeParse({...request.body, file: request?.file});
		if(!validation.success) {
      
			throw new BadRequestError("Check the required params!");
		}

		const {data} = validation;
		const result = await this.createEventUseCase.execute({...data, owner_id: user!.id, file: request?.file});

		return response.status(201).json({id: result});
	}
}

export { CreateEventController };

// {
// 	"name": "test",
// 	"description": "test",
// 	"tags" : "1,2,3,4",
// 	"price": 123.53,
// 	"amount": 35,
// 	"event_date": "{% now 'iso-8601', '' %}"
	
// }

