import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/errorHandler";
const app = express()
app.use(cors())
app.set("trust proxy", true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: false,
}))
app.get("/test", (request, response) => {
  return response.status(200).send(
    `<!DOCTYPE html> <html><head><title>My nginx</title></head><body><h1> Hello world! </h1></body></html>`
  )
})



app.all("*", (request,response,next) => {
  throw new NotFoundError()
})
app.use(errorHandler)
export { app };