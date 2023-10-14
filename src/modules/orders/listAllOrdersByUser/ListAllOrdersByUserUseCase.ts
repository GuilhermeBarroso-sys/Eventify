import { IOrderRepository } from "../repositories/IOrderRepository";
interface IOrderAllOrdersByUser {
  userId: string;
}

class ListAllOrdersByUserUseCase {
	constructor(private orderRepository : IOrderRepository) {}
	async execute({userId} : IOrderAllOrdersByUser) {
		return this.orderRepository.query({
			sql: `SELECT * FROM orders WHERE user_id = '${userId}'`
		});

	}
}

export { ListAllOrdersByUserUseCase };