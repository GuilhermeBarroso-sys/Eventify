import amqplib from "amqplib";
import { createWriteStream } from "fs";
import v8 from "v8";
import { Listener } from "../Listener";
import { Queues } from "../enum/queues";
import { PaymentCreatedEventListener } from "../events/paymentCreatedEvent";
export class PaymentCreatedListener extends Listener<PaymentCreatedEventListener> {
  readonly queue = Queues.paymentCreated;
  readonly options = {
    noAck: false
  }
  onMessage(data: PaymentCreatedEventListener["data"], message: amqplib.ConsumeMessage | null): void {
    const startTime = performance.now(); // Get current time before the loop
    const writableStream = createWriteStream("./test.txt")
    let count = 0;
    console.log(v8.getHeapStatistics().heap_size_limit / (1024 * 1024) + ' MB');

      for(let i = 0; i < 1e6; i++) {
        count++;
      }
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`Inserted ${count} registers in ${duration.toFixed(2)} milliseconds`)
      this.channel.ack(message!)


  }
}