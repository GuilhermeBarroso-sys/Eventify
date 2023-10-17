import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie, signIn} from "../../../test/setup";
import { randomUUID } from "crypto";

import { TagRepository } from "../repositories/prisma/TagPrismaRepository";
import { Tag } from "../repositories/ITagRepository";

describe("Testing Create Tag feature", () => {
	
	it("Should throw a not authorized error if the user does not have a cookie", async () => {
		await supertest(app)
			.post("/tags")
			.send({
				"id": randomUUID()
			})
			.expect(401);
	});
	it("Should throw a bad request error if the user doesn't provide required params", async () => {
		await supertest(app)
			.post("/tags")
			.set("Cookie", getMockedCookie())
			.send({})
			.expect(400);
		
	});

	it("Should throw a bad request error if the user doesn't provide a valid uuid in the id", async () => {
		await supertest(app)
			.post("/tags")
			.set("Cookie", getMockedCookie())
			.send({
				"id": "12312312"
			})
			.expect(400);
		
	});
	

	it("Should throw a error if the tag already exist", async () => {
		const {cookie} = await signIn();
		const tagRepository = new TagRepository();
		const tagId = randomUUID();
		await tagRepository.create({
			id: tagId,
			backgroundColor: "green",
			name: "free"
		});
		const response = await supertest(app)
			.post("/tags")
			.set("Cookie", cookie)
			.send({
				"name": "free",
				"backgroundColor": "green"
			})
			.expect(400);	
		const errorMessage = response.body.errors[0].message;
		expect(errorMessage).toBe("Tag Already exist");
	});
	
	it("Should create a tag without errors", async () => {
		const {cookie} = await signIn();
		const tagRepository = new TagRepository();
		const tagId = randomUUID();
		await supertest(app)
			.post("/tags")
			.set("Cookie", cookie)
			.send({
				"id": tagId,
				"name": "free",
				"backgroundColor": "green"
			})
			.expect(201);
		const isTagCreated = await tagRepository.query<Tag>({
			sql: `SELECT id from tags WHERE id = '${tagId}'`
		});
		expect(isTagCreated).toBeDefined();
		expect(isTagCreated![0].id).toBe(tagId);
	});

});