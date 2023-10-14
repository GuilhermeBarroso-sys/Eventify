import supertest from "supertest";
import {app} from "../../../app";
import {signIn} from "../../../test/setup";
import { OrderPrismaRepository } from "../repositories/prisma/OrderPrismaRepository";
import { randomUUID } from "crypto";
import { EventPrismaRepository } from "../../events/repositories/prisma/EventPrismaRepository";

async function createOrder() {
	const eventId = randomUUID();
	const orderId = randomUUID();
	const {user, cookie} = await signIn();
	await new EventPrismaRepository().create({
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
	await new OrderPrismaRepository().create({
		id:orderId,
		event_id: eventId,
		status: "pending",
		user_id: user.id,
	});
	return {orderId, user, cookie};
}
describe("Testing Find order feature", () => {

	it("Should throw a bad request error if the user doesn't provide a correct uuid in the id param", async () => {
		const { cookie} = await createOrder();

		await supertest(app)
			.get("/orders/123241241242142")
			.set("Cookie", cookie)

			.expect(400);
	});
	it("Should find an order if the user is authenticated", async () => {
		
		const { orderId : id, cookie} = await createOrder();
		const response = await supertest(app)
			.get(`/orders/${id}`)
			.set("Cookie", cookie)
			.expect(200);
		expect(response.body).toBeDefined();
	});

	it("Should find the order if the user is not authenticated", async () => {
		const { cookie} = await signIn();
		const response = await supertest(app)
			.get(`/orders/${randomUUID()}`)
			.set("Cookie", cookie)
			.expect(404);
		expect(response.body).toBeDefined();
	});
	it("Should find the order if the user is not authenticated", async () => {
		const { cookie} = await signIn();
		const {orderId : id} = await createOrder();
		const response = await supertest(app)
			.get(`/orders/${id}`)
			.set("Cookie", cookie)
			.expect(200);
		expect(response.body).toBeDefined();
	});
});