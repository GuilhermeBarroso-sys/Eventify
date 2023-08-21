import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import prisma from "./prisma";
import { PaymentCreatedPublisher } from "./adapters/messageBroker/rabbitMQ/publishers/PaymentCreatedPublisher";
import { rabbitMq } from "./adapters/messageBroker/rabbitMQ";
const app = express()
app.use(cors())
app.set("trust proxy", true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: false,
}))
app.get("/test", async(request, response) => {
  // await prisma.user.create({
  //   data: {
  //     name: "test",
  //     email: "test@gmail.com",
  //     password: "412421421412"
  //   }
  // })
  const users = await prisma.user.findMany()
  // console.log("aaaaaa", users.length)
  if(!users) {
    return response.status(404).send(`<!DOCTYPE html> <html><head><title>My nginx</title></head><body><h1> Hello world! Users not found!`)

  }
  new PaymentCreatedPublisher(rabbitMq.channel).publish({hello: "world"})
  return response.status(200).send(
    `<!DOCTYPE html> <html><head><title>My nginx</title></head><body><h1> Hello world! Users found : ${users.length}</h1></body></html>`
  )
})



app.all("*", (request,response,next) => {
  throw new NotFoundError()
})
app.use(errorHandler)
export { app };
