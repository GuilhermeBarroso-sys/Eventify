import "dotenv/config";
import { rabbitMq } from "./adapters/messageBroker/rabbitMQ";
import { PaymentCreatedListener } from "./adapters/messageBroker/rabbitMQ/listeners/PaymentCreatedListener";
import { PaymentCreatedPublisher } from "./adapters/messageBroker/rabbitMQ/publishers/PaymentCreatedPublisher";
import { app } from "./app";
import { clusterModule } from "./utils/clusterModule";
const AMQP_URL = process.env.AMQP_URL || 'amqp://rabbitmq:5672'

const start = async () => {
  await rabbitMq.start(AMQP_URL)

  const channel = rabbitMq.channel
  try {
    const paymentCreatedPublisher = new PaymentCreatedPublisher(channel)
    await paymentCreatedPublisher.createPublisher()
    process.on("SIGINT", () => rabbitMq.closeMessageBroker())
    process.on("SIGTERM", () => rabbitMq.closeMessageBroker())
  
    // paymentCreatedPublisher.publish({hello: "world!"}, {
    //   headers: {"x-delay": 2000}
    // })
    const paymentCreatedListener = new PaymentCreatedListener(channel)
    paymentCreatedListener.listen()

  } catch(e) {
    console.error('error', e)

  }
  app.listen(3000, () => {
    console.log("Server running at port 3000 🚀")
  })
}

clusterModule(start, {
  automaticForkWhenExit: true
})