import { OrderPrismaRepository } from "../repositories/prisma/OrderPrismaRepository";
import { CompleteOrderController } from "./CompleteOrderController";
import { CompleteOrderUseCase } from "./CompleteOrderUseCase";

export function CompleteOrderFactory() {
	const orderRepository = new OrderPrismaRepository();

	const completeOrderUseCase = new CompleteOrderUseCase(orderRepository);
	const completeOrderController = new CompleteOrderController(completeOrderUseCase);
	return completeOrderController;
}