import amqplib from "amqplib"
import { Exchanges } from "../enum/exchange"
import { ExchangeType } from "../enum/exchangeType"
import { Queues } from "../enum/queues"
import { RoutingKeys } from "../enum/routingKey"
export interface PaymentCreatedEventPublisher {
  exchange : Exchanges.paymentCreated
  exchangeType : ExchangeType.direct | string
  queue : Queues.paymentCreated
  routingKey : RoutingKeys.paymentCreated
  exchangeOptions: amqplib.Options.AssertExchange | undefined
  data: {
    hello: string
  }
}

export interface PaymentCreatedEventListener {
  queue : Queues.paymentCreated
  data: {
    hello: string
  }
}