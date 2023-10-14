import { Request, Response } from "express";
import { ListAllOrdersByUserUseCase } from "./ListAllOrdersByUserUseCase";
class ListAllOrdersByUserController {
	constructor(private listAllOrdersByUserUseCase : ListAllOrdersByUserUseCase) {}
	async handle(request: Request, response: Response) { 

		const orders = await this.listAllOrdersByUserUseCase.execute({userId: request.user!.id});
		return response.status(200).json(orders);
	}
}

export { ListAllOrdersByUserController };



