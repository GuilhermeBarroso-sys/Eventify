import { Request, Response } from "express";
import { CreateOrderUseCase } from "./CreateOrderUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";

class CreateOrderController {
	constructor(private createOrderUseCase : CreateOrderUseCase) {}
	async handle(request: Request, response: Response) { 
		const {user} = request;
		const schema = z.object({
			id: z.string().uuid("The id param should be an UUID").optional(),
			event_id: z.string().uuid("The id param should be an UUID"),
		});
    
		const validation = schema.safeParse({...request.body});
		if(!validation.success) {
			throw new BadRequestError("Check the required params!");
		}

		const {data} = validation;
		const result = await this.createOrderUseCase.execute({...data, user_id: user!.id});

		return response.status(201).json({id: result});
	}
}

export { CreateOrderController };

