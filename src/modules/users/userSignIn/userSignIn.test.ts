import supertest from "supertest";
import {app} from "../../../app";
describe("Testing user sign in feature", () => {
	it("Should throw an error if the user doesn't provide required params", async () => {
		await supertest(app)
			.post("/users/signin")
			.send({
				email: "test"
			})
			.expect(400);
	});

	it("Should throw an error if the credentials are wrong", async () => {
		await supertest(app)
			.post("/users/signin")
			.send({
				email: "testttt@gmail.com",
				password: "test123"
			})
			.expect(404);
	});

	it("Should sign in a user", async () => {
		await supertest(app)
			.post("/users/signup")
			.send({
				name: "testtt",
				email: "testttt@gmail.com",
				password: "test123"
			})
			.expect(201);
		const response = await supertest(app)
			.post("/users/signin")
			.send({
				email: "testttt@gmail.com",
				password: "test123"
			})
			.expect(200);
      
		expect(response.headers["set-cookie"]).toBeDefined();
	});
});