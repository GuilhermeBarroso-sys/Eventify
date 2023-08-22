
import { LogoutController } from "./LogoutController";
function LogoutFactory() {
	const logoutController = new LogoutController();
	return logoutController;
}

export { LogoutFactory };