import { Request, Response } from "express";
import { CompleteOrderUseCase } from "./CompleteOrderUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";

class CompleteOrderController {
	constructor(private completeOrderUseCase : CompleteOrderUseCase) {}
	async handle(request: Request, response: Response) { 
		const schema = z.object({
			orderId: z.string().uuid("The id param should be an UUID"),
		});
    
		const validation = schema.safeParse({orderId: request.params.orderId});
		if(!validation.success) {
			throw new BadRequestError("Check the required params!");
		}
		const {orderId} = request.params;
		const {id : user_id} = request.user!;

		await this.completeOrderUseCase.execute({
			user_id,
			order_id: orderId
		});
		return response.status(204).send();
	}
}

export { CompleteOrderController };



