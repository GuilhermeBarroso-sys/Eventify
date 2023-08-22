import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";
const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(express.json());
app.use(cookieSession({
	signed: false,
	secure: false,
}));
app.use(routes);
app.all("*", () => {
	throw new NotFoundError();
});
app.use(errorHandler);
export { app };
