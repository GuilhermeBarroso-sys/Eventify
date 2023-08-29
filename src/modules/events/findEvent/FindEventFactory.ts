import { EventPrismaRepository } from "../repositories/prisma/EventPrismaRepository";
import { FindEventController } from "./FindEventController";
import { FindEventUseCase } from "./FIndEventUseCase";

export function FindEventFactory() {
	const eventRepository = new EventPrismaRepository();
	const findEventUseCase = new FindEventUseCase(eventRepository);
	const findEventController = new FindEventController(findEventUseCase);
	return findEventController;
}