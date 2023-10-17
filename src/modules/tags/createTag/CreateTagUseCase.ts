import { randomUUID } from "crypto";
import {  ICreateTag, ITagRepository, Tag } from "../repositories/ITagRepository";

import { BadRequestError } from "../../../errors/BadRequestError";

class CreateTagUseCase {
	constructor(private tagRepository : ITagRepository) {}
	async execute(data : ICreateTag) {
		const id = data.id ? data.id : randomUUID();

		const tagExist = await this.tagRepository.query<Tag>({
			sql: `SELECT id FROM tags WHERE name = '${data.name.trim()}' LIMIT 1`
		});
		if(tagExist) {
			throw new BadRequestError("Tag Already exist");
		}

		await this.tagRepository.create({
			...data,
			id
		});
		return id;
	}
}

export { CreateTagUseCase };