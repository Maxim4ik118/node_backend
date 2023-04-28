import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
// import { format } from "date-fns";
import logger from "morgan";

// import path from "path";
// import fs from "fs/promises";

import booksRouter from "./routes/api/books";
import { ServerError } from "./models";
import { HttpError } from "./helpers";

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use(async (req, res, next) => {
//   const { method, path: requestPath } = req;
//   const logFilePath = path.join(__dirname, "./public/server.log");

//   const requestTimeStamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
//   const logString = `${method} ${requestPath} ${requestTimeStamp}`;
//   await fs.appendFile(logFilePath, `${logString} \n`);

//   next();
// });

app.use("/api/books", booksRouter);

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
