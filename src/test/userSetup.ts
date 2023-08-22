import prisma from "../prisma";

afterEach(async () => {

	await prisma.user.deleteMany();
});