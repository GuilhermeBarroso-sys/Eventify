import { Options } from "amqplib";
import { Publisher } from "../Publisher";
import { Exchanges } from "../enum/exchange";
import { Queues } from "../enum/queues";
import { RoutingKeys } from "../enum/routingKey";
import { OrderCancelledEventPublisher } from "../events/OrderCancelledEvent";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEventPublisher> {
	readonly exchange = Exchanges.orderCancelled;
	readonly exchangeType = "x-delayed-message";
	readonly queue = Queues.orderCancelled;
	readonly routingKey = RoutingKeys.orderCancelled;
	readonly exchangeOptions = {
		arguments: {
			"x-delayed-type": "direct"
		}
	};

}