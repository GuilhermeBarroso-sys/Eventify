import supertest from "supertest";
import {app} from "../../../app";
import {signIn} from "../../../test/setup";
import { OrderPrismaRepository } from "../repositories/prisma/OrderPrismaRepository";
import { randomUUID } from "crypto";
import { EventPrismaRepository } from "../../events/repositories/prisma/EventPrismaRepository";

async function createOrder() {
	const eventId = randomUUID();

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
	for(let i = 0; i < 3; i++) {

		await new OrderPrismaRepository().create({
			id: randomUUID(),
			event_id: eventId,
			status: "pending",
			user_id: user.id,
		});
	}


	return {user, cookie};
}
describe("Testing Find order feature", () => {

	it("Should find two or more orders if the user is authenticated", async () => {
		
		const {  cookie} = await createOrder();
		const response = await supertest(app)
			.get("/orders")
			.set("Cookie", cookie)
			.expect(200);
		expect(response.body).toBeDefined();
		expect(response.body.length).toBeGreaterThanOrEqual(2);

	});

	it("Shouldn't find the order if the user is not authenticated", async () => {
		const response = await supertest(app)
			.get("/orders")
			.expect(401);
		expect(response.body).toBeDefined();
	});
});