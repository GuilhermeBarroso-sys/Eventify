import { Exchanges } from "../enum/exchange";
import { Queues } from "../enum/queues";
import { RoutingKeys } from "../enum/routingKey";
import { OrderCreatedEventPublisher } from "../events/orderCreatedEvent";
import { Publisher } from "../Publisher";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEventPublisher> {
	readonly exchange = Exchanges.orderCreated;
	readonly exchangeType = "direct";
	readonly queue = Queues.orderCreated;
	readonly routingKey = RoutingKeys.orderCreated;
	readonly exchangeOptions = {
		// arguments: {
		// 	"x-delayed-type": "direct"
		// }
	};
}