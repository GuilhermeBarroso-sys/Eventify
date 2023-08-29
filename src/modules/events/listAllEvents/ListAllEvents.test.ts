import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie, signIn} from "../../../test/setup";
import { EventPrismaRepository } from "../repositories/prisma/EventPrismaRepository";

async function createEvent(owner_id : string) {
	await new EventPrismaRepository().create({
		name: "test",
		description: "test",
		amount: 35,
		event_date: new Date().toISOString(),
		owner_id,
		price: 50.25,
		image_url: "https://...",
		is_blocked: false,
		tags: "1,2,3,4"
	});
}
describe("Testing List all events feature", () => {

	it("Should throw a bad request error if the user doesn't provide a correct uuid in the owner_id param", async () => {
		await supertest(app)
			.get("/events?owner_id=123241241242142")
			.expect(400);
		await supertest(app)
			.post("/events?owner_id=test123")
			.set("Cookie", getMockedCookie())
			.send({
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": "123.53",
				// "amount": 35,
				"event_date": new Date()
			})
			.expect(400);
	});
	it("Should list all events if the user is authenticated", async () => {
		const {user, cookie} = await signIn();

		await createEvent(user.id);
		await createEvent(user.id);
		await createEvent(user.id);

		const response = await supertest(app)
			.get("/events")
			.set("Cookie", cookie)
			.expect(200);
		expect(response.body.length).toBe(3);
	});
	it("Should list all events if the user is not authenticated", async () => {
		const {user} = await signIn();

		await createEvent(user.id);
		await createEvent(user.id);
		await createEvent(user.id);

		const response = await supertest(app)
			.get("/events")
			.expect(200);
		expect(response.body.length).toBe(3);
	});

	it("Should list only events created by the current user", async () => {
		const {user: firstUser} = await signIn();
		const {user: secondUser} = await signIn();
		
		await createEvent(firstUser.id);
		await createEvent(firstUser.id);

		await createEvent(secondUser.id);
	
		const response = await supertest(app)
			.get(`/events?owner_id=${firstUser.id}`)
			.expect(200);

		expect(response.body.length).toBe(2);
		expect(response.body[0].owner_id).toBe(firstUser.id);
		expect(response.body[1].owner_id).toBe(firstUser.id);

	});


});