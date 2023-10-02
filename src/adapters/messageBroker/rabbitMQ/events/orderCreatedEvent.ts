import amqplib from "amqplib";
import { Exchanges } from "../enum/exchange";
import { ExchangeType } from "../enum/exchangeType";
import { Queues } from "../enum/queues";
import { RoutingKeys } from "../enum/routingKey";
export interface OrderCreatedEventPublisher {
  exchange : Exchanges.orderCreated
  exchangeType : ExchangeType.direct | string
  queue : Queues.orderCreated
  routingKey : RoutingKeys.orderCreated
  exchangeOptions: amqplib.Options.AssertExchange | undefined
  data: {
    event_id: string;
  }
}

export interface OrderCreatedEventListener {
  queue : Queues.orderCreated
  data: {
    event_id: string;
  }
}