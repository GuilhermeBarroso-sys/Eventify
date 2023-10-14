import { Options, ConsumeMessage } from "amqplib";
import { Listener } from "../Listener";
import { Queues } from "../enum/queues";
import { OrderCancelledEventListener } from "../events/OrderCancelledEvent";
import { EventPrismaRepository } from "../../../../modules/events/repositories/prisma/EventPrismaRepository";
import { OrderPrismaRepository } from "../../../../modules/orders/repositories/prisma/OrderPrismaRepository";
import { Order } from "../../../../modules/orders/repositories/IOrderRepository";

export class OrderCancelledListener extends Listener<OrderCancelledEventListener> {
	readonly queue = Queues.orderCancelled;
	options: Options.Consume = {
		noAck: false
	};
	async onMessage(data: OrderCancelledEventListener["data"], message: ConsumeMessage | null): void {
		const orderRepository = new OrderPrismaRepository();
		const order = await orderRepository.query<Order>({
			sql: `SELECT status from orders WHERE id = '${data.order_id}'`
		});
		if(order){
			const [{status}] = order;
			if(status == "completed") {
				this.channel.ack(message!);
				return;
			}
			await orderRepository.update({
				id: data.order_id,
				status: "cancelled"
			});
			const eventRepository = new EventPrismaRepository();
			await eventRepository.update({
				id: data.event_id,
				is_blocked: false
			});
			this.channel.ack(message!);
		}
    
	}

}