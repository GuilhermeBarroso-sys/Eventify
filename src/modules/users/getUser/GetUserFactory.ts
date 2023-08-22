
import { GetUserController } from "./GetUserController";
function GetUserFactory() {
	const getUserController = new GetUserController();
	return getUserController;
}

export { GetUserFactory };