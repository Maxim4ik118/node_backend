import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers";

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  const isValidId = isValidObjectId(bookId);
  if (!isValidId) {
    next(HttpError(400, `${bookId} isn't valid id!`));
  }
  next();
};

export { validateObjectId };
