

import { Event, IEventRepository } from "../repositories/IEventRepository";
import { NotFoundError } from "../../../errors/NotFoundError";
import moment from "moment";
import { BadRequestError } from "../../../errors/BadRequestError";
interface IFindEvent {
  id: string;
}

class FindEventUseCase {
	constructor(private eventRepository : IEventRepository) {}
	async execute({id} : IFindEvent) {
	
		const event = await this.eventRepository.query<Event>({
			sql: `SELECT * FROM events WHERE id = '${id}' LIMIT 1`
		});
		if(!event) {
			throw new NotFoundError();
		}
		

		return event[0];
	}
}

export { FindEventUseCase };
