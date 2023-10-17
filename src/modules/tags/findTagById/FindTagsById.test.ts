import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie} from "../../../test/setup";
import { TagRepository } from "../repositories/prisma/TagPrismaRepository";
import { randomUUID } from "crypto";

describe("Testing Find Tags by id feature", () => {
	
	it("Shouldn't throw a not authorized error if the user does not have a cookie", async () => {
		const tagId1 = randomUUID();
		const tagId2 = randomUUID();

		await supertest(app)
			.get(`/tags/tagsById?tagIds=${tagId1},${tagId2}`)
			.expect(204);
	});
	it("Shouldn't throw a bad request error if the user have a cookie", async () => {
		const tagId1 = randomUUID();
		const tagId2 = randomUUID();
		await supertest(app)
			.get(`/tags/tagsById?tagIds=${tagId1},${tagId2}`)

			.set("Cookie", getMockedCookie())
			.expect(204);
		
	});
	it("Should throw a bad request error if the user don't put the tags ids", async () => {
		await supertest(app)
			.get("/tags/tagsById")
			.set("Cookie", getMockedCookie())
			.expect(400);
	});

	it("Should return a 204 status code if doesn't exist a tag", async () => {
		const tagId1 = randomUUID();
		const tagId2 = randomUUID();
		const response = await supertest(app)
			.get(`/tags/tagsById?tagIds=${tagId1},${tagId2}`)
			.set("Cookie", getMockedCookie())
			.expect(204);
		
		expect(response.body).toStrictEqual({});
	});

	it("Should return a 200 status code if find one or more tag", async () => {
		const tagsIds = [randomUUID(), randomUUID(), randomUUID()];

		const tags = new TagRepository();
    
		for(let i = 0; i < 3; i++) {
			await tags.create({
				id: tagsIds[i],
				backgroundColor: "#ffffff",
				name: `Tag#${i}`
			});
		}
		const response = await supertest(app)
			.get(`/tags/tagsById?tagIds=${tagsIds.join(",")}`)
			.set("Cookie", getMockedCookie())
			.expect(200);
		console.log(response.body);
		expect(response.body.length).toBeGreaterThan(1);
		expect(response.body.length).toEqual(3);

	});

});