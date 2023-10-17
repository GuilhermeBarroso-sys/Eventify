import { Request, Response } from "express";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";
import { CreateTagUseCase } from "./CreateTagUseCase";

class CreateTagController {
	constructor(private createTagUseCase : CreateTagUseCase) {}
	async handle(request: Request, response: Response) { 
		const schema = z.object({
			id: z.string().uuid("The id param should be an UUID").optional(),
			name: z.string().trim(),
			backgroundColor: z.string().trim()
		});
		const validation = schema.safeParse({...request.body});
		if(!validation.success) {
			throw new BadRequestError("error: " + validation.error.issues[0].message );
		}
		const {data} = validation;
		await this.createTagUseCase.execute(data);
		return response.status(201).send();
	}
}

export { CreateTagController };

