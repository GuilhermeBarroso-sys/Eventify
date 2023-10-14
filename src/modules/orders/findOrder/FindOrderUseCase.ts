

import { Order, IOrderRepository } from "../repositories/IOrderRepository";
import { NotFoundError } from "../../../errors/NotFoundError";
interface IFindOrder {
  id: string;
}

class FindOrderUseCase {
	constructor(private orderRepository : IOrderRepository) {}
	async execute({id} : IFindOrder) {
		const order = await this.orderRepository.query<Order>({
			sql: `SELECT * FROM orders WHERE id = '${id}' LIMIT 1`
		});
		if(!order) {
			throw new NotFoundError();
		}
		return order[0];
	}
}

export { FindOrderUseCase };
