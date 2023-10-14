import supertest from "supertest";
import {app} from "../../../app";
import {getMockedCookie, signIn} from "../../../test/setup";
import { randomUUID } from "crypto";
import { OrderCreatedPublisher } from "../../../adapters/messageBroker/rabbitMQ/publishers/OrderCreatedPublisher";
import { OrderCancelledPublisher } from "../../../adapters/messageBroker/rabbitMQ/publishers/OrderCancelledPublisher";

describe("Testing Create order feature", () => {
	
	it("Should throw a not authorized error if the user does not have a cookie", async () => {
		await supertest(app)
			.post("/orders")
			.send({
				"event_id": randomUUID()
			})
			.expect(401);
	});
	it("Should throw a bad request error if the user doesn't provide required params", async () => {
		await supertest(app)
			.post("/orders")
			.set("Cookie", getMockedCookie())
			.send({})
			.expect(400);
		
	});

	it("Should throw a bad request error if the user doesn't provide a valid uuid in the event_id", async () => {
		await supertest(app)
			.post("/orders")
			.set("Cookie", getMockedCookie())
			.send({
				"event_id": "12312312"
			})
			.expect(400);
		
      
	});
	
	it("Should throw a not found error if the event doesn't exist", async () => {
		const {cookie} = await signIn();
		await supertest(app)
			.post("/orders")
			.set("Cookie", cookie)
			.send({
				"event_id": randomUUID() 
			})
			.expect(404);
	});
	it("Should throw a error if the event date is today or yesterday", async () => {
		OrderCreatedPublisher.prototype.publish = jest.fn();
		OrderCancelledPublisher .prototype.publish = jest.fn();
		const {cookie} = await signIn();
		const event_id = randomUUID();
		await supertest(app)
			.post("/events")
			.set("Cookie", cookie)
			.send({
				"id": event_id,
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": 123,
				"amount": 35,
				"event_date": new Date()
			})
			.expect(201);
		await supertest(app)
			.post("/orders")
			.set("Cookie", cookie)
			.send({
				"event_id": event_id
			})
			.expect(400);
	});
	it("Should throw an error if does not have more tickets", async () => {
		OrderCreatedPublisher.prototype.publish = jest.fn();
		OrderCancelledPublisher .prototype.publish = jest.fn();
		const {cookie} = await signIn();
		const event_id = randomUUID();
		const event_date =  new Date();
    
		event_date.setDate(event_date.getDate() + 7);
		await supertest(app)
			.post("/events")
			.set("Cookie", cookie)
			.send({
				"id": event_id,
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": 123,
				"amount": 0,
				"event_date": event_date
			})
			.expect(201);
		await supertest(app)
			.post("/orders")
			.set("Cookie", cookie)
			.send({
				"event_id": event_id
			})
			.expect(400);
	});

	it("Should create a order", async () => {
		OrderCreatedPublisher.prototype.publish = jest.fn();
		OrderCancelledPublisher .prototype.publish = jest.fn();
		const {cookie} = await signIn();
		const event_id = randomUUID();
		const event_date =  new Date();
    
		event_date.setDate(event_date.getDate() + 7);
		await supertest(app)
			.post("/events")
			.set("Cookie", cookie)
			.send({
				"id": event_id,
				"name": "test",
				"description": "test",
				"tags" : "1,2,3,4",
				"price": 123,
				"amount": 35,
				"event_date": event_date
			})
			.expect(201);
		await supertest(app)
			.post("/orders")
			.set("Cookie", cookie)
			.send({
				"event_id": event_id
			})
			.expect(201);
	});



});