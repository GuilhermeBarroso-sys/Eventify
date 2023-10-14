export type Order = {
  id: string;
  user_id: string;
  event_id: string;
  status: "pending" | "completed" | "cancelled"
  created_at: Date;
  updated_at: Date;
}

export interface ICreateOrder {
  id?: string;
  user_id: string;
  event_id: string;
  status: "pending" | "completed" | "cancelled"
}

export interface IUpdateOrder {
  id: string;
  user_id?: string;
  event_id?: string;
  status?: "pending" | "completed" | "cancelled"
}
export interface IQueryParams {
  sql: string
}
export interface IOrderRepository {
  query<T>(data : IQueryParams) : Promise<T[]|null>
  create(data: ICreateOrder) : Promise<void>
  update(data: IUpdateOrder) : Promise<void>

}
