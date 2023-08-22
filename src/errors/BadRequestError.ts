import { CustomError, TError } from "./CustomError";

class BadRequestError extends CustomError {
	statusCode = 400;
	constructor(message : string) {
		super(message);
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
	serializeErrors(): TError[] {
		return [{
			message: this.message
		}];
	}

}

export { BadRequestError };
