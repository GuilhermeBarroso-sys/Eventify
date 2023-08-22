import { Router } from "express";
import { UserSignInFactory } from "./userSignIn/UserSignInFactory";
import { UserSignUpFactory } from "./userSignUp/UserSignUpFactory";
import { GetUserFactory } from "./getUser/GetUserFactory";
import { LogoutFactory } from "./logout/LogoutFactory";
import { ensureAuth } from "../../middlewares/ensureAuth";
const userRoutes = Router();


userRoutes.post("/signin", (request,response) =>  UserSignInFactory().handle(request,response));
userRoutes.post("/signup", (request,response) =>  UserSignUpFactory().handle(request, response));
userRoutes.get("/getCurrentUser", ensureAuth ,(request,response) => GetUserFactory().handle(request, response));
userRoutes.post("/logout", (request,response) =>  LogoutFactory().handle(request, response));




export { userRoutes };