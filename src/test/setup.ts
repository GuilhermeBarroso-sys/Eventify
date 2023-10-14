import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { UserPrismaRepository } from "../modules/users/repositories/prisma/UserPrismaRepository";
import { Password } from "../utils/passwordHash";
import prisma from "../prisma";

export const getMockedCookie = () => {
	const payload = {
		id: randomUUID(),
		name: "test",
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


jest.mock("../utils/sendToBucket.ts", () => {
	return {
		sendToBucket: async () => {
			return {
				url: "test"
			};
		}
	};
});
jest.mock("multer", () => {
	const multer = () => ({
		single: () => {
			return (req, res, next) => {
				req.file = {
					
					originalname: "sample.name",
					mimetype: "sample.type",
					path: "sample.url",
					buffer: Buffer.from("whatever"), // this is required since `formData` needs access to the buffer
					
				};
				return next();
			};
		},
	});
	multer.memoryStorage = () => jest.fn();
	return multer;
});
export async function signIn() {
	const prisma = new UserPrismaRepository();
	const payload = {
		id: randomUUID(),
		email: "test@gmail.com",
		name: "test",
		password: Password.hashPassword({password: "test"}),
	};
	await prisma.create(payload);
	const token =  sign(payload, process.env.JWT_SECRET as string);
	const session = {token};
	const sessionJSON = JSON.stringify(session);
	const base64 = Buffer.from(sessionJSON).toString("base64");
	return {user: payload, cookie:[`session=${base64}`]};
} 
afterEach(async () => {
	await prisma.order.deleteMany();
	await prisma.event.deleteMany();
	await prisma.user.deleteMany();
});