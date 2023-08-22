import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";

export const getMockedCookie = () => {
	const payload = {
		id: randomUUID(),
		email: "test@gmail.com"
	};
	const token =  sign(payload, process.env.JWT_SECRET as string);
	const session = {token};
	const sessionJSON = JSON.stringify(session);
	const base64 = Buffer.from(sessionJSON).toString("base64");
	return [`session=${base64}`];
};
beforeAll(async () => {
	process.env.JWT_SECRET = "test";
	process.env.DATABASE_URL="mysql://root:root@app-mysql:3306/eventify_test";	
});
