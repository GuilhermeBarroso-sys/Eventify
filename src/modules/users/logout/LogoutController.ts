import { Request, Response } from "express";
class LogoutController {

	async handle(request: Request, response: Response) {
		request.session = null;
		return response.status(204).send();
	}
}

export { LogoutController };