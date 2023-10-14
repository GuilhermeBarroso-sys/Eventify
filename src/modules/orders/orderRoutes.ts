import { Router } from "express";
import { ensureAuth } from "../../middlewares/ensureAuth";
import { CreateOrderFactory } from "./createOrder/CreateOrderFactory";
import { FindOrderFactory } from "./findOrder/FindOrderFactory";
import { ListAllOrdersByUserFactory } from "./listAllOrdersByUser/ListAllOrdersByUserFactory";
import { CompleteOrderFactory } from "./completeOrder/CompleteOrderFactory";
const orderRoutes = Router();


orderRoutes.post("/completeOrder/:orderId",ensureAuth ,  (request,response) =>  CompleteOrderFactory().handle(request,response));
orderRoutes.post("/",ensureAuth ,  (request,response) =>  CreateOrderFactory().handle(request,response));
orderRoutes.get("/:orderId",ensureAuth ,  (request,response) =>  FindOrderFactory().handle(request,response));
orderRoutes.get("/",ensureAuth ,  (request,response) =>  ListAllOrdersByUserFactory().handle(request,response));



export { orderRoutes };