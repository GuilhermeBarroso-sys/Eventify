import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie} from "../../../test/setup";
import { TagRepository } from "../repositories/prisma/TagPrismaRepository";

describe("Testing Find All Tags feature", () => {
	
	it("Shouldn't throw a not authorized error if the user does not have a cookie", async () => {
		await supertest(app)
			.get("/tags")
			.expect(204);
	});
	it("Shouldn't throw a bad request error if the user have a cookie", async () => {
		await supertest(app)
			.get("/tags")
			.set("Cookie", getMockedCookie())
			.expect(204);
		
	});

	it("Should return a 204 status code if doesn't exist a tag", async () => {
		await supertest(app)
			.get("/tags")
			.set("Cookie", getMockedCookie())
			.expect(204);
		
	});

	it("Should return a 200 status code if find one or more tag", async () => {
		const tags = new TagRepository();
		for(let i = 0; i < 3; i++) {
			await tags.create({
				backgroundColor: "#ffffff",
				name: `Tag#${i}`
			});
		}
		const response = await supertest(app)
			.get("/tags")
			.set("Cookie", getMockedCookie())
			.expect(200);

		expect(response.body.length).toBeGreaterThan(1);
	});

});