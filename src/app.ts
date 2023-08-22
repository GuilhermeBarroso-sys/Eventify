import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";
import { ensureAuth } from "./middlewares/ensureAuth";

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieSession({
	signed: false,
	secure: false,
}));
app.use(routes);
app.get("/test", ensureAuth, (request, response) => {
	return response.status(200).json("ok");
});
app.all("*", () => {
	throw new NotFoundError();
});
app.use(errorHandler);
export { app };
