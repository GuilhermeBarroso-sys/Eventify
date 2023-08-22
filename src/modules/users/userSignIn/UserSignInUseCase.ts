import { BadRequestError } from "../../../errors/BadRequestError";
import { NotFoundError } from "../../../errors/NotFoundError";
import { Password } from "../../../utils/passwordHash";
import { IUserRepository, User } from "../repositories/IUserRepository";
import {sign} from "jsonwebtoken";
interface IUserSignInUseCase {
  email: string;
  password: string;
}

class UserSignInUseCase {

	constructor(private userRepository : IUserRepository) {}

	async execute({email,password} : IUserSignInUseCase) {
		const userExist = await this.userRepository.query<User>({
			sql: `SELECT id,name,email,password FROM users WHERE email = '${email}' LIMIT 1`
		});
		if(!userExist) {
			throw new NotFoundError();
		}
		const [user] = userExist;
		const isSamePassword = Password.verifyPassword({password, hashedPassword: user.password});
		if(!isSamePassword) {
			throw new BadRequestError("Wrong credentials.");
		}
		const userWithoutPassword = {...user,password: undefined};
		const token = sign(userWithoutPassword, process.env.JWT_SECRET as string);
		return {
			user: userWithoutPassword,
			token
		};
	}

}

export { UserSignInUseCase};