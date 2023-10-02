import { Request, Response } from "express";
import { UpdateEventUseCase } from "./UpdateEventUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";

class UpdateEventController {
	constructor(private updateEventUseCase : UpdateEventUseCase) {}
	async handle(request: Request, response: Response) { 
		const schema = z.object({
			id: z.string().uuid("The id param should be an UUID"),
			name: z.string().nonempty().trim().optional(),
			description: z.string().nonempty().trim().optional(),
			tags: z.string().trim().optional(),
			price: z.number().or(z.string().regex(/\d+/).transform(Number))
				.refine((n) => n >= 0).optional(),
			amount: z.number().int().or(z.string().regex(/\d+/).transform(Number))
				.refine(n => n >= 0).optional(),
			is_blocked: z.boolean().optional(),
			event_date: z.string().optional(),
		});
    
		const validation = schema.safeParse({...request.body, id: request.params.event_id,file: request?.file});
		if(!validation.success) {
      
			throw new BadRequestError("Check the required params!");
		}
		const {id : current_user_id} = request.user!;
		const {data : {id,description,name,amount,event_date,price,tags, is_blocked}} = validation;
		await this.updateEventUseCase.execute({
			id,
			amount,
			current_user_id,
			description,
			event_date,
			file: request.file,
			is_blocked,
			name,
			price,
			tags,
		});


		return response.status(204).send();
	}
}

export { UpdateEventController };

// {
// 	"name": "test",
// 	"description": "test",
// 	"tags" : "1,2,3,4",
// 	"price": 123.53,
// 	"amount": 35,
// 	"event_date": "{% now 'iso-8601', '' %}"
	
// }

