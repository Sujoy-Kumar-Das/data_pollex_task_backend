import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response, urlencoded } from "express";
import config from "./app/config";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

// router setup
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send(`Server Running on port ${config.port}`);
});

// global error handler middleware
app.use(globalErrorHandler);

// not found middleware
app.use(notFound);

export default app;
