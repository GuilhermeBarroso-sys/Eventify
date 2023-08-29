import { Router } from "express";
import { ensureAuth } from "../../middlewares/ensureAuth";
import { CreateEventFactory } from "./createEvent/CreateEventFactory";
import multer from "multer";
import { ListAllEventsFactory } from "./listAllEvents/ListAllEventsFactory";
import { FindEventFactory } from "./findEvent/FindEventFactory";
const upload = multer({dest: "src/tmp/"});
const eventRoutes = Router();


eventRoutes.post("/",ensureAuth , upload.single("image_url"), (request,response) =>  CreateEventFactory().handle(request,response));
eventRoutes.get("/", (request,response) =>  ListAllEventsFactory().handle(request,response));
eventRoutes.get("/:eventId", (request,response) =>  FindEventFactory().handle(request,response));


export { eventRoutes };