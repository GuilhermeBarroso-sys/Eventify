import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie} from "../../../test/setup";
describe("Testing get User feature", () => {
	it("Should throw an not authorized error if the cookie are not found", async () => {
		await supertest(app)
			.get("/users/getCurrentUser")
			.expect(401);
	});

	it("Should return the current user without errors", async () => {
		
		await supertest(app)
			.get("/users/getCurrentUser")
			.set("Cookie", getMockedCookie())
			.send({})
			.expect(200);

	});

});