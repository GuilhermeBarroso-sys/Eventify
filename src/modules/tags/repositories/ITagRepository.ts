export type Tag = {
  id?: string;
  name: string;
  backgroundColor: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateTag {
  id?: string;
  name: string;
  backgroundColor: string;
}

export interface IQueryParams {
  sql: string
}
export interface ITagRepository {
  query<T>(data : IQueryParams) : Promise<T[]|null>
  create(data: ICreateTag) : Promise<void>

}
