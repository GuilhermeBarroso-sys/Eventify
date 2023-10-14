import amqplib from "amqplib";
import { Exchanges } from "../enum/exchange";
import { ExchangeType } from "../enum/exchangeType";
import { Queues } from "../enum/queues";
import { RoutingKeys } from "../enum/routingKey";
export interface OrderCancelledEventPublisher {
  exchange : Exchanges.orderCancelled
  exchangeType : ExchangeType.direct | string
  queue : Queues.orderCancelled
  routingKey : RoutingKeys.orderCancelled
  exchangeOptions: amqplib.Options.AssertExchange | undefined
  data: {
    event_id: string;
    order_id: string;
  }
}

export interface OrderCancelledEventListener {
  queue : Queues.orderCancelled
  data: {
    order_id: string;
    event_id: string;
  }
}