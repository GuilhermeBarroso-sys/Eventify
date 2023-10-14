import { NotFoundError } from "../../../errors/NotFoundError";
import { IOrderRepository, Order } from "../repositories/IOrderRepository";

interface ICompleteOrder {
  order_id: string;
  user_id: string;
}
interface OrderQuery {
  order_id: string;
  status: Order["status"]
}

class CompleteOrderUseCase {
	constructor(private orderRepository : IOrderRepository) {}
	async execute(data : ICompleteOrder) {

		const orderExists = await this.orderRepository.query<OrderQuery|null>({
			sql: `
      SELECT o.id as order_id, o.status 
      FROM orders o 
      WHERE o.id = '${data.order_id}' 
      AND user_id = '${data.user_id}' 
      AND o.status != 'cancelled' LIMIT 1`
		});
		if(!orderExists) {
			throw new NotFoundError();
		}
		const [order] = orderExists;
		await this.orderRepository.update({
			id: order!.order_id,
			status: "completed"
		});
	}
}

export { CompleteOrderUseCase };