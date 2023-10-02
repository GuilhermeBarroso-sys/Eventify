import "dotenv/config";
import { rabbitMq } from "./adapters/messageBroker/rabbitMQ";
import { OrderCreatedListener } from "./adapters/messageBroker/rabbitMQ/listeners/OrderCreatedListener";
import { OrderCreatedPublisher } from "./adapters/messageBroker/rabbitMQ/publishers/OrderCreatedPublisher";
import { app } from "./app";
import { clusterModule } from "./utils/clusterModule";
const AMQP_URL = process.env.AMQP_URL || "amqp://rabbitmq:5672";

const start = async () => {
	await rabbitMq.start(AMQP_URL);

	const channel = rabbitMq.channel;
	try {
		const orderCreatedPublisher = new OrderCreatedPublisher(channel);
		await orderCreatedPublisher.createPublisher();
		process.on("SIGINT", () => rabbitMq.closeMessageBroker());
		process.on("SIGTERM", () => rabbitMq.closeMessageBroker());
  
		// orderCreatedPublisher.publish({hello: "world!"}, {
		// 	headers: {"x-delay": 5000}
		// });
		const orderCreatedListener = new OrderCreatedListener(channel);
		orderCreatedListener.listen();

	} catch(e) {
		console.error("error", e);

	}
	app.listen(3000, () => {
		console.log(`Server running at port 3000 🚀\nEnvironment: ${process.env.NODE_ENV}`);
	});
};

clusterModule(start, {
	automaticForkWhenExit: true
});