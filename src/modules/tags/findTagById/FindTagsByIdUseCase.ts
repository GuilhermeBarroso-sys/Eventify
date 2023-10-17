import {  ITagRepository, Tag } from "../repositories/ITagRepository";

interface IFindTagsByIdUseCaseProps {
  tagIds: Array<string>
}
class FindTagsByIdUseCase {
	constructor(private tagRepository : ITagRepository) {}
	async execute({tagIds}: IFindTagsByIdUseCaseProps) {
		const queryTagIds = tagIds.map((tag) => {
			return `'${tag}'`;
		}).join(",");
		const tags = await this.tagRepository.query<Tag[]>({
			sql: `SELECT * FROM tags WHERE id IN (${queryTagIds})`
		});
		return tags;
	}
}

export { FindTagsByIdUseCase };