import {  OrderPrismaRepository } from "../repositories/prisma/OrderPrismaRepository";
import { FindOrderController } from "./FindOrderController";
import { FindOrderUseCase } from "./FindOrderUseCase";

export function FindOrderFactory() {
	const orderRepository = new OrderPrismaRepository();
	const findOrderUseCase = new FindOrderUseCase(orderRepository);
	const findOrderController = new FindOrderController(findOrderUseCase);
	return findOrderController;
}