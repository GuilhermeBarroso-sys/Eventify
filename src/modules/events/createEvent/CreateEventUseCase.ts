import { randomUUID } from "crypto";
import { IEventRepository } from "../repositories/IEventRepository";
import { sendToBucket } from "../../../utils/sendToBucket";
interface ICreateEvent {
  id?: string;
  name: string;
  description: string;
  owner_id: string;
  tags?: string;
  price: number;
  amount: number;
  event_date: string;
  file?: Express.Multer.File
}

interface IEventData extends ICreateEvent{
  image_url?: string;
}
class CreateEventUseCase {
	constructor(private eventRepository : IEventRepository) {}
	async execute(data : ICreateEvent) {
		const id = data.id ? data.id : randomUUID();
		const eventData : IEventData = {
			...data,
			file: undefined
		};
		if(data.file) {
			const splittedName = data.file.originalname.split(".");
			const type = splittedName[splittedName.length];
			const image =  await sendToBucket({
				bucket: "app-eventify",
				directory: "images/logo",
				filename: `${id}${type}`,
				path: data.file.path
			});
			eventData.image_url = image.url;
		}
		
		await this.eventRepository.create(eventData);
	
		return id;
	}
}

export { CreateEventUseCase };