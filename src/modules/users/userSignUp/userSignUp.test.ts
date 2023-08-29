import supertest from "supertest";
import {app} from "../../../app";
describe("Testing user sign up feature", () => {
	it("Should throw an error if the user doesn't provide required params", async () => {
		await supertest(app)
			.post("/users/signup")
			.send({
				name: "test"
			})
			.expect(400);
	});

	it("Should throw an error if the user already exists", async () => {
		await supertest(app)
			.post("/users/signup")
			.send({
				name: "testtt",
				email: "testttt@gmail.com",
				password: "test123"
			})
			.expect(201);
		await supertest(app)
			.post("/users/signup")
			.send({
				name: "testtt",
				email: "testttt@gmail.com",
				password: "test123"
			})
			.expect(400);
	});

	it("Should create a user", async () => {
		await supertest(app)
			.post("/users/signup")
			.send({
				name: "testtt",
				email: "testttt@gmail.com",
				password: "test123"
			})
			.expect(201);
	});
});