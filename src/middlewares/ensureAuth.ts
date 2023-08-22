import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { verify } from "jsonwebtoken";
interface ICurrentUser {
  id: string;
  name: string;
  email: string;
}

export function ensureAuth(request : Request, response: Response, next: NextFunction) {
	if(!request?.session?.token) {

		throw new NotAuthorizedError();
	}
	try {

		const payload = verify(request.session.token, process.env.JWT_SECRET as string) as ICurrentUser;
		request.user = payload;
		next();
	} catch(err) {
		console.error(err);
		request.session = null;
		throw new NotAuthorizedError();
	}

}