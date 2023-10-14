import "dotenv/config";
import { rabbitMq } from "./adapters/messageBroker/rabbitMQ";
import { OrderCreatedListener } from "./adapters/messageBroker/rabbitMQ/listeners/OrderCreatedListener";
import { OrderCreatedPublisher } from "./adapters/messageBroker/rabbitMQ/publishers/OrderCreatedPublisher";
import { app } from "./app";
import { clusterModule } from "./utils/clusterModule";
import { OrderCancelledPublisher } from "./adapters/messageBroker/rabbitMQ/publishers/OrderCancelledPublisher";
import { OrderCancelledListener } from "./adapters/messageBroker/rabbitMQ/listeners/OrderCancelledListener";
const AMQP_URL = process.env.AMQP_URL || "amqp://rabbitmq:5672";

const start = async () => {
	await rabbitMq.start(AMQP_URL);
	process.on("SIGINT", () => rabbitMq.closeMessageBroker());
	process.on("SIGTERM", () => rabbitMq.closeMessageBroker());
	const channel = rabbitMq.channel;
	try {
		const orderCreatedPublisher = new OrderCreatedPublisher(channel);
		const orderCancelledPublisher = new OrderCancelledPublisher(channel);
		await orderCreatedPublisher.createPublisher();
		await orderCancelledPublisher.createPublisher();
    
		// orderCreatedPublisher.publish({hello: "world!"}, {
		// 	headers: {"x-delay": 5000}
		// });
		const orderCreatedListener = new OrderCreatedListener(channel);
		const orderCancelledListener = new OrderCancelledListener(channel);

		orderCreatedListener.listen();
		orderCancelledListener.listen();

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