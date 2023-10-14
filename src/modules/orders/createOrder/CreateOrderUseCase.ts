import { randomUUID } from "crypto";
import {  IOrderRepository } from "../repositories/IOrderRepository";
import { Event, IEventRepository } from "../../events/repositories/IEventRepository";
import { NotFoundError } from "../../../errors/NotFoundError";
import { OrderCreatedPublisher } from "../../../adapters/messageBroker/rabbitMQ/publishers/OrderCreatedPublisher";
import { rabbitMq } from "../../../adapters/messageBroker/rabbitMQ";
import moment from "moment";
import { BadRequestError } from "../../../errors/BadRequestError";
interface ICreateOrder {
  id?: string;
  event_id: string;
  user_id: string;
}
class CreateOrderUseCase {
	constructor(private orderRepository : IOrderRepository, private eventRepository : IEventRepository) {}
	async execute(data : ICreateOrder) {
		const id = data.id ? data.id : randomUUID();
		const eventExist = await this.eventRepository.query<Event>({
			sql: `SELECT * FROM events WHERE id = '${data.event_id}'`
		});
		if(!eventExist) {
			throw new NotFoundError();
		}
		const [event] = eventExist;
		const eventDate = moment(event.event_date);
		const today = moment();
		const daysUntilEvent = eventDate.diff(today, "days");
		if(daysUntilEvent <= 1) {
			throw new BadRequestError("Tickets for the event can only be purchased at least two days before the event date.");
		}
		if(event.amount < 1) {
			throw new BadRequestError("This event has no more tickets available.");
		}
		await this.orderRepository.create({
			...data,
			id,
			status: "pending",
			event_id: data.event_id,
			user_id: data.user_id
		});
		
		const orderCreatedPublisher = new OrderCreatedPublisher(rabbitMq.channel);
		orderCreatedPublisher.publish({
			event_id: data.event_id,
			order_id: id
		});

		return id;
	}
}

export { CreateOrderUseCase };