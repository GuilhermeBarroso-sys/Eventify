import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie, signIn} from "../../../test/setup";
describe("Testing Create event feature", () => {
	
	it("Should throw a not authorized error if the user does not have a cookie", async () => {
		await supertest(app)
			.post("/events")
			.send({
				"name": "test",
				"descriptåion": "test",
				"tags" : "1,2,3,4",
				"price": 123,
				"amount": 35,
				"event_date": new Date()
			})
			.expect(401);
	});
	it("Should throw a bad request error if the user doesn't provide required params", async () => {
		await supertest(app)
			.post("/events")
			.set("Cookie", getMockedCookie())
			.send({
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": 123.53,
				// "amount": 35,
				"event_date": new Date()
			})
			.expect(400);
		await supertest(app)
			.post("/events")
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

	it("Should throw a bad request error if the user doesn't provide an integer amount", async () => {
		await supertest(app)
			.post("/events")
			.set("Cookie", getMockedCookie())
			.send({
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"file": "test",
				"price": 123,
				"amount": 35.5,
				"event_date": new Date()
			})
			.expect(400);
		const response = await supertest(app)
			.post("/events")
			.set("Cookie", getMockedCookie())
			.send({
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"file": "test",
				"price": 123,
				"amount": "5.5",
				"event_date": new Date()
			});
		expect(response.statusCode).not.toBe(201);
      
	});
	it("Should throw a server error if the user id does not exist", async () => {
		await supertest(app)
			.post("/events")
			.set("Cookie", getMockedCookie())
			.send({
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": 123,
				"amount": 35,
				"event_date": new Date()
			})
			.expect(500);
	});
	it("Shouldn't throw a bad request error if the user doesn't provide optional params", async () => {
		const {cookie} = await signIn();
		await supertest(app)
			.post("/events")
			.set("Cookie", cookie)
			.send({
				"name": "test",
				"description": "test",
				// "tags" : "1,2,3,4",
				"price": 123,
				"amount": 35,
				"event_date": new Date()
			})
			.expect(201);
	});
	it("Shouldn't throw a bad request error if the user doesn't provide optional params", async () => {
		const {cookie} = await signIn();
		await supertest(app)
			.post("/events")
			.set("Cookie", cookie)
			.send({
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": 123,
				"amount": 35,
				"event_date": new Date()
			})
			.expect(201);
	});

	it("Should create a event without errors", async () => {
		const {cookie} = await signIn();
		await supertest(app)
			.post("/events")
			.set("Cookie", cookie)
			.send({
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": 123,
				"amount": 35,
				"file": "test",
				"event_date": new Date()
			})
			.expect(201);
		await supertest(app)
			.post("/events")
			.set("Cookie", cookie)
			.send({
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": "123",
				"amount": "35",
				"file": "test",
				"event_date": new Date()
			})
			.expect(201);
	});
});