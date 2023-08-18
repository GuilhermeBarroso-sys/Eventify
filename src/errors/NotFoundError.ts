import { CustomError, TError } from "./customError";

class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Not found")
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
  serializeErrors(): TError[] {
    return [{
      message: "Not found"
    }]
  }

}

export { NotFoundError };
