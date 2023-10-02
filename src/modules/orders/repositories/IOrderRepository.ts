export type Order = {
  id: string;
  user_id: string;
  event_id: string;
  expires_at?: string;
  status: "pending" | "completed" | "cancelled"
  price?: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateOrder {
  id?: string;
  user_id: string;
  event_id: string;
  expires_at?: string;
  status: "pending" | "completed" | "cancelled"
  price?: number;
}

export interface IUpdateOrder {
  id: string;
  user_id: string;
  event_id: string;
  expires_at?: string;
  status: "pending" | "completed" | "cancelled"
  price?: number;
}
export interface IQueryParams {
  sql: string
}
export interface IOrderRepository {
  query<T>(data : IQueryParams) : Promise<T[]|null>
  create(data: ICreateOrder) : Promise<void>
  update(data: IUpdateOrder) : Promise<void>

}
