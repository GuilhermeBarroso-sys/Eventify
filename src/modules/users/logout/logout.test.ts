import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie} from "../../../test/setup";
describe("Testing Logout User feature", () => {
	it("Should return 204 without errors", async () => {
		await supertest(app)
			.post("/users/logout")
			.expect(204);
		await supertest(app)
			.post("/users/logout")
			.set("Cookie", getMockedCookie())
			.expect(204);
	});


});