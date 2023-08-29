import { Request, Response } from "express";
import { FindEventUseCase } from "./FIndEventUseCase";
import { z } from "zod";
import { BadRequestError } from "../../../errors/BadRequestError";

class FindEventController {
	constructor(private findEventUseCase : FindEventUseCase) {}
	async handle(request: Request, response: Response) { 
		const schema = z.object({
			eventId: z.string().uuid("The id param should be an UUID"),
		});
		const {eventId} = request.params;
		const validation = schema.safeParse({eventId});
		if(!validation.success) {
			throw new BadRequestError(validation.error.issues[0].message);
		}
		const event = await this.findEventUseCase.execute({id: eventId});
		return response.status(200).json(event);
	}
}

export { FindEventController };

