import amqplib from "amqplib";
import { Listener } from "../Listener";
import { Queues } from "../enum/queues";
import { OrderCreatedEventListener } from "../events/orderCreatedEvent";
import { EventPrismaRepository } from "../../../../modules/events/repositories/prisma/EventPrismaRepository";
import { OrderCancelledPublisher } from "../publishers/OrderCancelledPublisher";
import { rabbitMq } from "..";
export class OrderCreatedListener extends Listener<OrderCreatedEventListener> {
	readonly queue = Queues.orderCreated;
	readonly options = {
		noAck: false
	};
	async onMessage(data: OrderCreatedEventListener["data"], message: amqplib.ConsumeMessage | null): void {
		const eventRepository = new EventPrismaRepository();
		await eventRepository.update({
			id: data.event_id,
			is_blocked: true
		});
		const orderCancelledPublisher = new OrderCancelledPublisher(rabbitMq.channel);
		orderCancelledPublisher.publish({
			event_id: data.event_id,
			order_id: data.order_id
		}, {
			headers: {"x-delay": 5000}
		});
		this.channel.ack(message!);


	}
}