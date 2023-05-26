import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";

import booksRouter from "./routes/api/books";
import authRouter from "./routes/api/auth";
import { ServerError } from "./models";
import { HttpError } from "./helpers";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  const { method, path } = req;
  const error = HttpError(
    404,
    `Route with path ${path} and method ${method} wasn't found!`
  );

  res.status(error.status).json({
    message: error.message,
  });
});

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Oops, some 'Server error' occurred... " } =
    err;
    
  res.status(status).json({ message });
});

export { app };
