import {  TagRepository } from "../repositories/prisma/TagPrismaRepository";
import { FindTagsByIdController } from "./FindTagsByIdController";
import { FindTagsByIdUseCase } from "./FindTagsByIdUseCase";
export function FindTagsByIdFactory() {
	const tagRepository = new TagRepository();
	const findTagsByIdUseCase = new FindTagsByIdUseCase(tagRepository);
	const findTagsByIdController = new FindTagsByIdController(findTagsByIdUseCase);
	return findTagsByIdController;
}