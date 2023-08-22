import {z} from "zod";

const User = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	password: z.string()
});
export type User = z.infer<typeof User>
export interface IFindUserByEmailParams {
  email: User["email"]
}
export interface IQueryParams {
  sql: string
}
export interface IUserRepository {
  findUserByEmail(data : IFindUserByEmailParams): Promise<User|null>
  query<T>(data : IQueryParams) : Promise<T[]|null>
}
