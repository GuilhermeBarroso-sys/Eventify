import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma";
import { IQueryParams,IUserRepository , IFindUserByEmailParams } from "../IUserRepository";

class UserPrismaRepository implements IUserRepository {
	async findUserByEmail(data: IFindUserByEmailParams) {
		const user = await prisma.user.findFirst({
			where: {
				email: data.email
			}
		});
		return user;
	}
	async query<T>(data: IQueryParams) {
		const result = await prisma.$queryRaw<T[]|[]>(Prisma.raw(data.sql));
		return result.length ? result : null;
	}

}


export { UserPrismaRepository };