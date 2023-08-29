import { IEventRepository } from "../repositories/IEventRepository";
import { SQL } from "../../../utils/SQL";
interface IListAllEvents {
  owner_id?: string;
}

class ListAllEventsUseCase {
	constructor(private eventRepository : IEventRepository) {}
	async execute({owner_id} : IListAllEvents) {
		const sql = owner_id ? `SELECT * FROM events WHERE owner_id = ${SQL.insertQuotes(owner_id)}` : "SELECT * FROM events";
		const events = await this.eventRepository.query({sql});
		return events;
	}
}

export { ListAllEventsUseCase };