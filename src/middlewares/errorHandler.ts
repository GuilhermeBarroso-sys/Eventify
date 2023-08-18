import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export function errorHandler(error: Error, request : Request, response: Response, next: NextFunction) {
  if(error instanceof CustomError) {
    return response.status(error.statusCode).json({errors: error.serializeErrors()})
  } else {
    console.error(error)
    return response.status(500).json({
      errors: [{
        message: error.message
      }]
    })
  }
}