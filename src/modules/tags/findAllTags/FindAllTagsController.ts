import { Request, Response } from "express";
import { FindAllTagsUseCase } from "./FindAllTagsUseCase";
class FindAllTagsController {
	constructor(private  findAllTagsUseCase: FindAllTagsUseCase) {}
	async handle(request: Request, response: Response) { 
		const tags = await this.findAllTagsUseCase.execute();
		return tags ? response.status(200).json(tags): response.status(204).send();
	}
}

export { FindAllTagsController };

