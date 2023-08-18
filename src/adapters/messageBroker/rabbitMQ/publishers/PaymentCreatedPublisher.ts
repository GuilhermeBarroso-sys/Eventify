import { Exchanges } from "../enum/exchange";
import { Queues } from "../enum/queues";
import { RoutingKeys } from "../enum/routingKey";
import { PaymentCreatedEventPublisher } from "../events/paymentCreatedEvent";
import { Publisher } from "../publisher";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEventPublisher> {
  readonly exchange = Exchanges.paymentCreated;
  readonly exchangeType = 'x-delayed-message';
  readonly queue = Queues.paymentCreated;
  readonly routingKey = RoutingKeys.paymentCreated;
  readonly exchangeOptions = {
   arguments: {
       'x-delayed-type': "direct"
   }
 }
}