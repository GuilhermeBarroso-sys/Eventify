import { IEventRepository } from "../repositories/IOrderRepository";
import { NotFoundError } from "../../../errors/NotFoundError";
import { NotAuthorizedError } from "../../../errors/NotAuthorizedError";
import { BadRequestError } from "../../../errors/BadRequestError";
import { sendToBucket } from "../../../utils/sendToBucket";
interface IUpdateEvent {
  id: string;
  current_user_id: string;
  name?: string;
  description?: string;
  tags?: string | null;
  price?: number;
  amount?: number;
  is_blocked?: boolean;
  event_date?: string;
  file?: Express.Multer.File
}
interface IDataToUpdateEvent extends Omit<IUpdateEvent, "current_user_id">{
  image_url?: string;
  current_user_id: undefined;
}

interface IEventQuery {
  owner_id: string;
}
class UpdateEventUseCase {
	constructor(private eventRepository : IEventRepository) {}
	async execute(data : IUpdateEvent) {
		const isEventExists = await this.eventRepository.query<IEventQuery>({
			sql: `SELECT owner_id FROM events WHERE id = '${data.id}' LIMIT 1`
		});
		if(!isEventExists) {
			throw new NotFoundError();
		}
		const [event] = isEventExists;
    
		if(event.owner_id !== data.current_user_id) {
			throw new NotAuthorizedError();
		}
		const dataToUpdateEvent : IDataToUpdateEvent = {
			...data,
			current_user_id: undefined
		};
    
		if(data.is_blocked) {
			throw new BadRequestError("The event cannot be updated because is blocked.");
		}

		if(data.file) {
			const splittedName = data.file.originalname.split(".");
			const type = splittedName[splittedName.length];
			const image = await sendToBucket({
				bucket: "app-eventify",
				directory: "images/logo",
				filename: `${data.id}${type}`,
				path: data.file.path
			});
			dataToUpdateEvent.image_url = image.url; 
		}

		await this.eventRepository.update(dataToUpdateEvent);
	}
}

export { UpdateEventUseCase };