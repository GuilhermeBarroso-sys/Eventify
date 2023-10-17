import {  TagRepository } from "../repositories/prisma/TagPrismaRepository";
import { FindAllTagsController } from "./FindAllTagsController";
import { FindAllTagsUseCase } from "./FindAllTagsUseCase";
export function FindAllTagsFactory() {
	const tagRepository = new TagRepository();
	const findAllTagsUseCase = new FindAllTagsUseCase(tagRepository);
	const findAllTagsController = new FindAllTagsController(findAllTagsUseCase);
	return findAllTagsController;
}