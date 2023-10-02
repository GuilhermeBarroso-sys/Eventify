export type User = {
  id: string;
  name: string;
  email: string;
  isSSO: boolean;
  password?: string;
}

export interface ICreateUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
}
export interface IQueryParams {
  sql: string
}
export interface IUserRepository {
  query<T>(data : IQueryParams) : Promise<T[]|null>
  create(data : ICreateUser ) : Promise<void>
}
