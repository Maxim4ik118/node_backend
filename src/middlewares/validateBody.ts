import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { HttpError } from "../helpers";

const validateBody = (schema: Joi.ObjectSchema<any>) => {
  const validatedFunction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return validatedFunction;
};

export { validateBody };
