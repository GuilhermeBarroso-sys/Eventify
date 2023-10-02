import { Router } from "express";
import { ensureAuth } from "../../middlewares/ensureAuth";
import { CreateOrderFactory } from "./createOrder/CreateOrderFactory";
const orderRoutes = Router();


orderRoutes.post("/",ensureAuth ,  (request,response) =>  CreateOrderFactory().handle(request,response));


export { orderRoutes };