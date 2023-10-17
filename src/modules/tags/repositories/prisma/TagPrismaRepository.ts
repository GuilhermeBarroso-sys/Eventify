import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma";
import { ICreateTag, IQueryParams, ITagRepository } from "../ITagRepository";



class TagRepository implements ITagRepository {
	async query<T>(data: IQueryParams) {
		const result = await prisma.$queryRaw<T[]|[]>(Prisma.raw(data.sql));
		return result.length ? result : null;
	}

	async create(data: ICreateTag): Promise<void> {
		await prisma.tag.create({data});
	}

}

export { TagRepository };