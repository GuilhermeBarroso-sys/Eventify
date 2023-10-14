import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie, signIn} from "../../../test/setup";
import { randomUUID } from "crypto";
import { EventPrismaRepository } from "../../events/repositories/prisma/EventPrismaRepository";
import { OrderPrismaRepository } from "../repositories/prisma/OrderPrismaRepository";
import { Order } from "../repositories/IOrderRepository";
interface ICreateOrder {
  status: Order["status"]
}
async function createOrder({status} : ICreateOrder) {
	const eventId = randomUUID();
	const orderId = randomUUID();
	const {user, cookie} = await signIn();
	const event =  new EventPrismaRepository();
  
	await event.create({
		id:eventId,
		name: "test",
		description: "test",
		amount: 35,
		event_date: new Date().toISOString(),
		owner_id: user.id ,
		price: 50.25,
		image_url: "https://...",
		is_blocked: false,
		tags: "1,2,3,4"
	}); 

	const order = new OrderPrismaRepository();
  
	await order.create({
		id:orderId,
		event_id: eventId,
		status: status,
		user_id: user.id,
	});
	return {orderId, user, cookie};
}
describe("Testing Complete order feature", () => {
	
	it("Should throw a not authorized error if the user does not have a cookie", async () => {
		await supertest(app)
			.post(`/orders/completeOrder/${randomUUID()}`)
			.expect(401);
	});
	it("Should throw a bad request error if the user doesn't provide a correct param", async () => {
		await supertest(app)
			.post("/orders/completeOrder/123")
			.set("Cookie", getMockedCookie())
			.send({})
			.expect(400);
		
	});

	
	it("Should throw a not found error if the order doesn't exist", async () => {
		const {cookie} = await signIn();
		await supertest(app)
			.post(`/orders/completeOrder/${randomUUID()}`)
			.set("Cookie", cookie)
			.expect(404);
		const {orderId} = await createOrder({status: "pending"});
		await supertest(app)
			.post(`/orders/completeOrder/${orderId}`)
			.set("Cookie", cookie)
			.expect(404);
		const {orderId : orderId2, cookie : cookie2} = await createOrder({status: "cancelled"});
  
		await supertest(app)
			.post(`/orders/completeOrder/${orderId2}`)
			.set("Cookie", cookie2)
			.expect(404);
	});

	it("Should complete the order without error", async () => {
		const {orderId, cookie} = await createOrder({status: "pending"});
		await supertest(app)
			.post(`/orders/completeOrder/${orderId}`)
			.set("Cookie", cookie)
			.expect(204);

		const orderRepository = new OrderPrismaRepository();
		const orderQuery = await orderRepository.query<Order>({
			sql: `SELECT status from orders WHERE id = '${orderId}'`
		});
		const order = orderQuery![0];
		expect(order.status).toBe("completed");
	});


});