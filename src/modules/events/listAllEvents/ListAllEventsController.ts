import { Request, Response } from "express";
import { ListAllEventsUseCase } from "./ListAllEventsUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";

class ListAllEventsController {
	constructor(private listAllEventsUseCase : ListAllEventsUseCase) {}
	async handle(request: Request, response: Response) { 

		const schema = z.object({
			owner_id: z.string().uuid("The owner_id param should be an UUID").optional(),
		});
		const validation = schema.safeParse(request.query);
		if(!validation.success) {
			throw new BadRequestError(validation.error.issues[0].message);
		}
		const owner_id = request.query.owner_id as string;
		const events = await this.listAllEventsUseCase.execute({owner_id});
		return response.status(200).json(events);
	}
}

export { ListAllEventsController };



