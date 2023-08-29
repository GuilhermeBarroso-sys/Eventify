import { EventPrismaRepository } from "../repositories/prisma/EventPrismaRepository";
import { CreateEventController } from "./CreateEventController";
import { CreateEventUseCase } from "./CreateEventUseCase";

export function CreateEventFactory() {
	const eventRepository = new EventPrismaRepository();
	const createEventUseCase = new CreateEventUseCase(eventRepository);
	const createEventController = new CreateEventController(createEventUseCase);
	return createEventController;
}