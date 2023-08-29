import { Router } from "express";
import { userRoutes } from "../modules/users/userRoutes";
import { eventRoutes } from "../modules/events/eventRoutes";
const routes = Router();
routes.use("/users", userRoutes);
routes.use("/events", eventRoutes);


export { routes };