import { UserPrismaRepository } from "../repositories/prisma/UserPrismaRepository";
import { UserSignUpController } from "./UserSignUpController";
import { UserSignUpUseCase } from "./UserSignUpUseCase";

function UserSignUpFactory() {
	const userRepository = new UserPrismaRepository();
	const userSignUpUseCase = new UserSignUpUseCase(userRepository);
	const userSignUpController = new UserSignUpController(userSignUpUseCase);
	return userSignUpController;
	
}

export { UserSignUpFactory };