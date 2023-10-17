import { Request, Response } from "express";
import { FindTagsByIdUseCase } from "./FindTagsByIdUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";

class FindTagsByIdController {
	constructor(private  findTagsById: FindTagsByIdUseCase) {}
	async handle(request: Request, response: Response) { 
    
		const schema = z.object({
			tagIds: z.string(),
		});
		const paramsTagsIds = request.query.tagIds as string;
		const validation = schema.safeParse({tagIds: paramsTagsIds});
		if(!validation.success) {
			throw new BadRequestError("error: " + validation.error.issues[0].message );
		}
		const tags = await this.findTagsById.execute({
			tagIds: paramsTagsIds.split(",")
		});
		return tags ? response.status(200).json(tags) : response.status(204).send();
	}
}

export { FindTagsByIdController };

