import {  TagRepository } from "../repositories/prisma/TagPrismaRepository";
import { CreateTagController } from "./CreateTagController";
import { CreateTagUseCase } from "./CreateTagUseCase";

export function CreateTagFactory() {
	const tagRepository = new TagRepository();
	const createTagUseCase = new CreateTagUseCase(tagRepository);
	const createTagController = new CreateTagController(createTagUseCase);
	return createTagController;
}