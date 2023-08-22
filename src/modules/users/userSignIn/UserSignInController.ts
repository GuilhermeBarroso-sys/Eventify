import { Request, Response } from "express";
import { UserSignInUseCase } from "./UserSignInUseCase";
import {z} from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";
class UserSignInController {
	constructor(private userSignInUseCase : UserSignInUseCase) {}
	async handle(request: Request, response: Response) {
		const schema = z.object({
			email: z.string().email(),
			password: z.string()
		}); 
		const validation = schema.safeParse(request.body);
		if(!validation.success) {
			throw new BadRequestError("Please, provide an E-mail and a password.");
		}
		const {email, password} = validation.data;
		const {token,user} = await this.userSignInUseCase.execute({email, password});
		request.session = {
			token
		};
		return response.status(200).json({token, user});
	}
}

export { UserSignInController };