import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers";

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    next(HttpError(400, `${id} isn't valid id!`));
  }
  next();
};

export { validateObjectId };
