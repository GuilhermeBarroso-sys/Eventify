import { Router } from "express";
import { userRoutes } from "../modules/users/userRoutes";
const routes = Router();
routes.use("/users", userRoutes);

export { routes };