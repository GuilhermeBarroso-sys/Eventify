import {  ITagRepository, Tag } from "../repositories/ITagRepository";
class FindAllTagsUseCase {
	constructor(private tagRepository : ITagRepository) {}
	async execute() {
		const tags = await this.tagRepository.query<Tag[]>({
			sql: "SELECT * FROM tags"
		});
		return tags;
	}
}

export { FindAllTagsUseCase };