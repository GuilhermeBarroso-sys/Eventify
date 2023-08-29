import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma";
import { ICreateUser, IQueryParams,IUserRepository } from "../IUserRepository";

class UserPrismaRepository implements IUserRepository {
	async query<T>(data: IQueryParams) {
		const result = await prisma.$queryRaw<T[]|[]>(Prisma.raw(data.sql));
		return result.length ? result : null;
	}
	async create(data: ICreateUser): Promise<void> {
		await prisma.user.create({data});
	}

}


export { UserPrismaRepository };