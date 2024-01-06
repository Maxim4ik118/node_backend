import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../helpers";
import { User } from "../models";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers?.authorization as string | undefined;

  if (authorization === undefined) {
    next(HttpError(401, "Invalid Bearer"));
    return;
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") next(HttpError(401, "Invalid Bearer"));

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };
    const user = await User.findById(_id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Invalid Bearer"));
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (err) {
    next(HttpError(401, "Invalid Bearer"));
  }
};

export { authenticate };
