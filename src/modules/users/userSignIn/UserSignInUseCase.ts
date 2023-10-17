import { randomUUID } from "crypto";
import { BadRequestError } from "../../../errors/BadRequestError";
import { NotAuthorizedError } from "../../../errors/NotAuthorizedError";
import { NotFoundError } from "../../../errors/NotFoundError";
import { Password } from "../../../utils/passwordHash";
import { IUserRepository, User } from "../repositories/IUserRepository";
import {decode, sign} from "jsonwebtoken";

interface IUserSignInUseCase {
  email?: string;
  password?: string;
  isSSO?: boolean
  ssoToken?: string
}

interface ISupabaseSSO {
  aud: "string",
  exp: number,
  iat: number,
  iss: string,
  sub: string,
  email: string,
  phone: string,
  app_metadata: { provider: string, providers: Array<string> },
  user_metadata: {
    avatar_url: string,
    email: string,
    email_verified: true,
    full_name: string,
    iss: string,
    name: string,
    preferred_username: string,
    provider_id: string,
    sub: string,
    user_name: string,
  },
  role: string,
  aal: string,
  amr: [ { method: "oauth", timestamp: number } ],
  session_id: string,
}
class UserSignInUseCase {

	constructor(private userRepository : IUserRepository) {}

	async execute({email,password, isSSO,ssoToken} : IUserSignInUseCase) {
		const userExist = await this.userRepository.query<User>({
			sql: `SELECT id,name,email,isSSO,password FROM users WHERE email = '${email}' LIMIT 1`
		});
		// SSO
		if(isSSO && ssoToken) {
			try {
				const data = decode(ssoToken) as ISupabaseSSO;
		
				let user : User;
				if(!userExist) {
					const id = randomUUID();
					const userData = {
						id,
						email: data.email,
						name: data.user_metadata.name,
						isSSO: true
					};
					await this.userRepository.create(userData);
					user = userData;
				} else {
					user = userExist[0];
				}
				const token = sign(user, process.env.JWT_SECRET as string);
				return {
					user: user,
					token
				};
			} catch(err) {
				throw new NotAuthorizedError();
			}
		}
		// E-mail Authentication

		if(!userExist) {
			throw new NotFoundError();
		}
		const [user] = userExist;
		const isSamePassword = Password.verifyPassword({password: password!, hashedPassword: user.password!});
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