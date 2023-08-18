import amqplib from "amqplib";
import { Exchanges } from "./enum/exchange";
import { ExchangeType } from "./enum/exchangeType";
import { Queues } from "./enum/queues";
import { RoutingKeys } from "./enum/routingKey";

interface Event {
  exchange: Exchanges;
  exchangeType: ExchangeType | string;
  exchangeOptions: amqplib.Options.AssertExchange | undefined
  queue: Queues;
  routingKey: RoutingKeys;
  data: any;
}


abstract class Publisher<T extends Event> {
  protected abstract exchange : T["exchange"]
  protected abstract exchangeType : T["exchangeType"]
  protected abstract queue : T["queue"]
  protected abstract routingKey : T["routingKey"]
  protected abstract exchangeOptions : T["exchangeOptions"]
  constructor(protected channel : amqplib.Channel ) {}
  async createPublisher() {
    await this.channel.assertExchange(this.exchange, this.exchangeType, this.exchangeOptions)
    await this.channel.assertQueue(this.queue, {durable : true});
    await this.channel.bindQueue(this.queue, this.exchange, this.routingKey)

  }
  publish(data : T["data"], options? : amqplib.Options.Publish | undefined) {
    this.channel.publish(this.exchange,this.routingKey,Buffer.from(JSON.stringify(data)), options)
  }
}

export { Publisher };

