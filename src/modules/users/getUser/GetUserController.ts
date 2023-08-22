import { Request, Response } from "express";
class GetUserController {

	async handle(request: Request, response: Response) {
		return response.status(200).json({user : request.user});
	}
}

export { GetUserController };