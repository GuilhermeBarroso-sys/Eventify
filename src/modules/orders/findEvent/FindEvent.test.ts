import supertest from "supertest";
import {app} from "../../../app";
import {signIn} from "../../../test/setup";
import { EventPrismaRepository } from "../repositories/prisma/EventPrismaRepository";
import { randomUUID } from "crypto";

async function createEvent(owner_id : string) {
	const id = randomUUID();
	await new EventPrismaRepository().create({
		id,
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
	return {id};
}
describe("Testing Find event feature", () => {

	it("Should throw a bad request error if the user doesn't provide a correct uuid in the id param", async () => {
		await supertest(app)
			.get("/events/123241241242142")
			.expect(400);
	});
	it("Should find an event if the user is authenticated", async () => {
		const {user, cookie} = await signIn();
		const {id} = await createEvent(user.id);
		const response = await supertest(app)
			.get(`/events/${id}`)
			.set("Cookie", cookie)
			.expect(200);
		expect(response.body).toBeDefined();
	});
	it("Should list all events if the user is not authenticated", async () => {
		const {user} = await signIn();
		const {id} = await createEvent(user.id);
		const response = await supertest(app)
			.get(`/events/${id}`)
			.expect(200);
		expect(response.body).toBeDefined();
	});
});