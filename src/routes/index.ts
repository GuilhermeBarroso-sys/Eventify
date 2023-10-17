import { Router } from "express";
import { userRoutes } from "../modules/users/userRoutes";
import { eventRoutes } from "../modules/events/eventRoutes";
import { orderRoutes } from "../modules/orders/orderRoutes";
import { tagRoutes } from "../modules/tags/tagRoutes";
const routes = Router();
routes.use("/users", userRoutes);
routes.use("/events", eventRoutes);
routes.use("/orders", orderRoutes);
routes.use("/tags", tagRoutes);




export { routes };