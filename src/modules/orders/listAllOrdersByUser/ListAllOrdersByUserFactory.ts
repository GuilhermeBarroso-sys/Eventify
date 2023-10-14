import { OrderPrismaRepository } from "../repositories/prisma/OrderPrismaRepository";
import { ListAllOrdersByUserController } from "./ListAllOrdersByUserController";
import { ListAllOrdersByUserUseCase } from "./ListAllOrdersByUserUseCase";


export function ListAllOrdersByUserFactory() {
	const orderRepository = new OrderPrismaRepository();
	const listAllOrdersByUserUseCase = new ListAllOrdersByUserUseCase(orderRepository);
	const listAllOrdersByUserController = new ListAllOrdersByUserController(listAllOrdersByUserUseCase);
	return listAllOrdersByUserController;
}