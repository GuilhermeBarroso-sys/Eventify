import { randomUUID } from "crypto";
import { BadRequestError } from "../../../errors/BadRequestError";
import { IUserRepository, User } from "../repositories/IUserRepository";
import {sign} from "jsonwebtoken";
interface IUserSignUpUseCase {
  name: string;
  email: string;
  password: string;
}

class UserSignUpUseCase {

	constructor(private userRepository : IUserRepository) {}

	async execute({name, email ,password} : IUserSignUpUseCase) {
		const userExist = await this.userRepository.query<User>({
			sql: `SELECT id FROM users WHERE email = "${email}" LIMIT 1`
		});
		if(userExist) {
			throw new BadRequestError("This user already exists!");
		}
		const id = randomUUID();
		const user = {
			id,
			name,
			email,
			password
		};

		await this.userRepository.query({sql: `INSERT INTO users (id,name, email, password) VALUES ("${id}", "${name}", "${email}", "${password}")`});
		const userWithoutPassword = {...user, password: undefined};
		const token = sign(userWithoutPassword, process.env.JWT_SECRET as string);
		return {
			user: userWithoutPassword,
			token
		};
	}

}

export { UserSignUpUseCase};