import { EventPrismaRepository } from "../repositories/prisma/OrderPrismaRepository";
import { ListAllEventsController } from "./ListAllEventsController";
import { ListAllEventsUseCase } from "./ListAllEventsUseCase";

export function ListAllEventsFactory() {
	const eventRepository = new EventPrismaRepository();
	const listAllEventsUseCase = new ListAllEventsUseCase(eventRepository);
	const listAllEventsController = new ListAllEventsController(listAllEventsUseCase);
	return listAllEventsController;
}