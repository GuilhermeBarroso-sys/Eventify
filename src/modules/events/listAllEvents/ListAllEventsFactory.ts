import { EventPrismaRepository } from "../repositories/prisma/EventPrismaRepository";
import { ListAllEventsController } from "./ListAllEventsController";
import { ListAllEventsUseCase } from "./ListAllEventsUseCase";

export function ListAllEventsFactory() {
	const eventRepository = new EventPrismaRepository();
	const listAllEventsUseCase = new ListAllEventsUseCase(eventRepository);
	const listAllEventsController = new ListAllEventsController(listAllEventsUseCase);
	return listAllEventsController;
}