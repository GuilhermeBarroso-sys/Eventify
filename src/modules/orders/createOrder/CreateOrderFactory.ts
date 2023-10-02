import { EventPrismaRepository } from "../../events/repositories/prisma/EventPrismaRepository";
import { OrderPrismaRepository } from "../repositories/prisma/OrderPrismaRepository";
import { CreateOrderController } from "./CreateOrderController";
import { CreateOrderUseCase } from "./CreateOrderUseCase";

export function CreateOrderFactory() {
	const orderRepository = new OrderPrismaRepository();
	const eventRepository = new EventPrismaRepository();

	const createOrderUseCase = new CreateOrderUseCase(orderRepository, eventRepository);
	const createOrderController = new CreateOrderController(createOrderUseCase);
	return createOrderController;
}