import { CustomError, TError } from "./CustomError";

class NotAuthorizedError extends CustomError {
	statusCode = 401;
	constructor() {
		super("Not Authorized.");
		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}
	serializeErrors(): TError[] {
		return [{
			message: "Not Authorized."
		}];
	}

}

export { NotAuthorizedError };
