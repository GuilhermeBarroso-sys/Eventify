import { Router } from "express";
import { UserSignInFactory } from "./userSignIn/UserSignInFactory";
import { UserSignUpFactory } from "./userSignUp/UserSignUpFactory";
const userRoutes = Router();


userRoutes.post("/signIn", async (request,response) => await UserSignInFactory().handle(request,response));
userRoutes.post("/signUp", async (request,response) => await UserSignUpFactory().handle(request, response));


export { userRoutes };