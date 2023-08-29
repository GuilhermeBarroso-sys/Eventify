import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma";
import {  ICreateEvent, IEventRepository, IQueryParams, IUpdateEvent } from "../IEventRepository";


class EventPrismaRepository implements IEventRepository {
	async query<T>(data: IQueryParams) {
		const result = await prisma.$queryRaw<T[]|[]>(Prisma.raw(data.sql));
		return result.length ? result : null;
	}

	async create(data: ICreateEvent): Promise<void> {
		await prisma.event.create({data});
	}

	async update(data: IUpdateEvent) {
		await prisma.event.update({
			where: {
				id: data.id
			},
			data: {
				...data,
				id: undefined
			}
		});
	}
}

export { EventPrismaRepository };