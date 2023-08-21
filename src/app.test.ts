import supertest from "supertest"
import prisma from "./prisma"
import { app } from "./app"

jest.mock("./adapters/messageBroker/rabbitMQ/publishers/PaymentCreatedPublisher.ts")
describe("Testing", () => {
  it("Should return hello world", async() => {

    await supertest(app)
    .get('/test')
    .expect(200)
  })
})