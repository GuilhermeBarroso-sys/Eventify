import { Request, Response } from "express";

import {z} from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";
import { UserSignUpUseCase } from "./UserSignUpUseCase";
import { Password } from "../../../utils/passwordHash";
class UserSignUpController {
	constructor(private userSignUpUseCase : UserSignUpUseCase) {}
	async handle(request: Request, response: Response) {
		const schema = z.object({
			name: z.string().nonempty("Empty name!"),
			email: z.string().email(),
			password: z.string().transform((arg) => Password.hashPassword({password:arg}))
		}); 
		const validation = schema.safeParse(request.body);
		if(!validation.success) {
			throw new BadRequestError("Please, check the params. Required params]");
		}
		const {name ,email,password} = validation.data;

		const {token,user} = await this.userSignUpUseCase.execute({name, email, password});
		request.session = {
			token
		};
		return response.status(201).json({token, user});
	}
}

export { UserSignUpController };