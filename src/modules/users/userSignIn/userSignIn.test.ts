import supertest from "supertest";
import {app} from "../../../app";
import { sign } from "jsonwebtoken";
import { randomUUID } from "crypto";
import { UserPrismaRepository } from "../repositories/prisma/UserPrismaRepository";
import { User } from "../repositories/IUserRepository";
describe("Testing user sign in feature", () => {
	const mockedTokenPayload = {
		aud: "authenticated",
		exp: 1697563941,
		iat: 1697560341,
		iss: "test",
		sub: "cd147e4a-cab0-4bf1-a2f1-64471f12c534",
		email: "test@gmail.com",
		phone: "244214124214",
		app_metadata: { provider: "email", providers: [ "email", "github" ] },
		user_metadata: {
			avatar_url: "test",
			email: "test@gmail.com",
			email_verified: true,
			full_name: "test name",
			iss: "https://api.github.com",
			name: "test name",
			preferred_username: "testuser",
			provider_id: "4124",
			sub: "4124",
			user_name: "testuser"
		},
		role: "authenticated",
		aal: "aal1",
		amr: [ { method: "oauth", timestamp: new Date().getTime() } ],
		session_id: randomUUID()
	};
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
	it("Should throw an error if the user provide a invalid E-mail", async () => {
		await supertest(app)
			.post("/users/signin")
			.send({
				email: "testttt",
				password: "test123"
			})
			.expect(400);
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
	it("Should sign in a SSO user", async () => {
		const userRepository = new UserPrismaRepository();
		await userRepository.create({
			email: mockedTokenPayload.email,
			name: mockedTokenPayload.user_metadata.name,
			isSSO: true
		});
		const mockedToken = sign(mockedTokenPayload, "test");
		const response = await supertest(app)
			.post("/users/signin")
			.send({
				isSSO: true,
				ssoToken: mockedToken
			})
			.expect(200);
		const user = await userRepository.query<User>({
			sql: `SELECT * FROM users WHERE email = '${mockedTokenPayload.email}' LIMIT 1`
		});
		const userData = user![0];
		expect(user).not.toBeNull();
		expect(userData.isSSO).toBeTruthy();
		expect(response.headers["set-cookie"]).toBeDefined();
	});
	it("Should sign in a SSO user and create a account if does not exist", async () => {
		const mockedToken = sign(mockedTokenPayload, "test");

		const response = await supertest(app)
			.post("/users/signin")
			.send({
				isSSO: true,
				ssoToken: mockedToken
			})
			.expect(200);
		const userRepository = new UserPrismaRepository();
		const user = await userRepository.query<User>({
			sql: `SELECT * FROM users WHERE email = '${mockedTokenPayload.email}' LIMIT 1`
		});
		const userData = user![0];
		expect(user).not.toBeNull();
		expect(userData.isSSO).toBeTruthy();
		expect(response.headers["set-cookie"]).toBeDefined();
	});
	it("Shouldn't sign in a SSO user if the token isn't correct", async () => {
		const userRepository = new UserPrismaRepository();
		await userRepository.create({
			email: mockedTokenPayload.email,
			name: mockedTokenPayload.user_metadata.name,
			isSSO: true
		});
		// const mockedToken = sign(mockedTokenPayload, "test");
		const mockedToken = "fk21ok41o2k5ofk12oko412";
		await supertest(app)
			.post("/users/signin")
			.send({
				isSSO: true,
				ssoToken: mockedToken
			})
			.expect(401);
	});
});