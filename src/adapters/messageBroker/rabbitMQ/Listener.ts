import amqplib from "amqplib";
import { Queues } from "./enum/queues";
interface Event {
  queue: Queues
  data: any;
}
abstract class Listener<T extends Event> {
  abstract queue : T["queue"]
  abstract options : amqplib.Options.Consume | undefined
  abstract onMessage(data : T["data"], message: amqplib.ConsumeMessage | null) : void
  constructor(protected channel : amqplib.Channel) {}
  listen() {
    this.channel.consume(this.queue, (message) => {
      const data = JSON.parse(message!.content.toString())
      
      this.onMessage(data, message)
    }, this.options)
  }
}

export { Listener };
