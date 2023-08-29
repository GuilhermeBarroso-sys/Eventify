import { EventPrismaRepository } from "../repositories/prisma/EventPrismaRepository";
import { FindEventController } from "./UpdateEventController";
import { FindEventUseCase } from "./UpdateEventUseCase";

export function FindEventFactory() {
	const eventRepository = new EventPrismaRepository();
	const findEventUseCase = new FindEventUseCase(eventRepository);
	const findEventController = new FindEventController(findEventUseCase);
	return findEventController;
}