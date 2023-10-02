import { randomUUID } from "crypto";
import {  IOrderRepository } from "../repositories/IOrderRepository";
import { Event, IEventRepository } from "../../events/repositories/IEventRepository";
import { NotFoundError } from "../../../errors/NotFoundError";
import { OrderCreatedListener } from "../../../adapters/messageBroker/rabbitMQ/listeners/OrderCreatedListener";
import { OrderCreatedPublisher } from "../../../adapters/messageBroker/rabbitMQ/publishers/OrderCreatedPublisher";
import { rabbitMq } from "../../../adapters/messageBroker/rabbitMQ";
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
			sql: `SELECT id,price FROM events WHERE id = '${data.event_id}'`
		});
		if(!eventExist) {
			throw new NotFoundError();
		}
		const [event] = eventExist;
		await this.orderRepository.create({
			...data,
			id,
			// expires_at: new Date().toISOString(),
			// price: event.price,
			status: "pending",
			event_id: data.event_id,
			user_id: data.user_id
		});
		
		const orderCreatedPublisher = new OrderCreatedPublisher(rabbitMq.channel);
		orderCreatedPublisher.publish({
			event_id: data.event_id
		});
		return id;
	}
}

export { CreateOrderUseCase };