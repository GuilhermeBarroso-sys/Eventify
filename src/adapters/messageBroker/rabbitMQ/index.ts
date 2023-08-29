import amqplib from "amqplib";
const AMQP_URL = process.env.AMQP_URL || "amqp://localhost:5672";

class RabbitMq {
	// @ts-ignore
	channel : amqplib.Channel;
	// @ts-ignore
	connection : amqplib.Connection;
 
	async start(url: string) {
		try {
			const connection = await amqplib.connect(url);
			const channel = await connection.createChannel();
			this.connection = connection;
			this.channel = channel;
			process.env.NODE_ENV != "production" && console.log("RabbitMQ connected with success! 🐰");
		} catch(err) {
			console.log(err);
		}
	}
	async closeMessageBroker()  {
		console.log("closing RabbitMQ...");
		await this.channel.close();
		await this.connection.close();
	}
}

export const rabbitMq = new RabbitMq();







