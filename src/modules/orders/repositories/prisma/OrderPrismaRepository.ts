import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma";
import {  ICreateOrder, IOrderRepository, IQueryParams, IUpdateOrder } from "../IOrderRepository";


class OrderPrismaRepository implements IOrderRepository {
	async query<T>(data: IQueryParams) {
		const result = await prisma.$queryRaw<T[]|[]>(Prisma.raw(data.sql));
		return result.length ? result : null;
	}

	async create(data: ICreateOrder): Promise<void> {
		await prisma.order.create({data});
	}

	async update(data: IUpdateOrder) {
		await prisma.order.update({
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

export { OrderPrismaRepository };