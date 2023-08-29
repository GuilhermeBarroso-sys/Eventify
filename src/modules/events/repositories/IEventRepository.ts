export type Event = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  tags?: string;
  price: number;
  amount: number;
  is_blocked?: boolean;
  event_date: Date;
  image_url: string;
}

export interface ICreateEvent {
  id?: string;
  name: string;
  description: string;
  owner_id: string;
  tags?: string;
  price: number;
  amount: number;
  is_blocked?: boolean;
  event_date: string;
  image_url?: string;
}

export interface IUpdateEvent {
  id: string;
  name?: string;
  description?: string;
  owner_id?: string;
  tags?: string | null;
  price?: number;
  amount?: number;
  is_blocked?: boolean;
  event_date?: string;
  image_url?: string;
}
export interface IQueryParams {
  sql: string
}
export interface IEventRepository {
  query<T>(data : IQueryParams) : Promise<T[]|null>
  create(data: ICreateEvent) : Promise<void>
  update(data: IUpdateEvent) : Promise<void>

}
