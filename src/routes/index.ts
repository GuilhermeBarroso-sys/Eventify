import { Router } from "express";
import { userRoutes } from "../modules/users/userRoutes";
import { eventRoutes } from "../modules/events/eventRoutes";
import { orderRoutes } from "../modules/orders/orderRoutes";
const routes = Router();
routes.use("/users", userRoutes);
routes.use("/events", eventRoutes);
routes.use("/orders", orderRoutes);



export { routes };