import { Router } from "express";
import { ensureAuth } from "../../middlewares/ensureAuth";
import { CreateTagFactory } from "./createTag/CreateTagFactory";
import { FindAllTagsFactory } from "./findAllTags/FindAllTagsFactory";
import { FindTagsByIdFactory } from "./findTagById/FindTagsByIdFactory";

const tagRoutes = Router();
tagRoutes.post("/",ensureAuth ,  (request,response) =>  CreateTagFactory().handle(request,response));
tagRoutes.get("/tagsById" ,  (request,response) =>  FindTagsByIdFactory().handle(request,response));
tagRoutes.get("/" ,  (request,response) =>  FindAllTagsFactory().handle(request,response));
export { tagRoutes };