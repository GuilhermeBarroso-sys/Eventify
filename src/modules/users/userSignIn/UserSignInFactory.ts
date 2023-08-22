import { UserPrismaRepository } from "../repositories/prisma/UserPrismaRepository";
import { UserSignInController } from "./UserSignInController";
import { UserSignInUseCase } from "./UserSignInUseCase";

function UserSignInFactory() {
	const userRepository = new UserPrismaRepository();
	const userSignInUseCase = new UserSignInUseCase(userRepository);
	const userSignInController = new UserSignInController(userSignInUseCase);
	return userSignInController;
}

export { UserSignInFactory };