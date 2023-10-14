import { Request, Response } from "express";
import {  FindOrderUseCase } from "./FindOrderUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";

class FindOrderController {
	constructor(private findOrderUseCase : FindOrderUseCase) {}
	async handle(request: Request, response: Response) { 
		const schema = z.object({
			orderId: z.string().uuid("The id param should be an UUID"),
		});
		const {orderId} = request.params;
		const validation = schema.safeParse({orderId});
		if(!validation.success) {
			throw new BadRequestError(validation.error.issues[0].message);
		}
		const event = await this.findOrderUseCase.execute({id: orderId});
		return response.status(200).json(event);
	}
}

export { FindOrderController };

