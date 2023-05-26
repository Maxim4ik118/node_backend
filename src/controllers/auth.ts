import { Request, Response } from "express";
import { ctrlWrapper, HttpError } from "../helpers";
import { User } from "../models";

const AuthController = {
  register: ctrlWrapper(async (req: Request, res: Response) => {
    const newUser = await User.create(req.body);
    console.log('newUser: ', newUser);

    res.status(201).json({ email: newUser.email, name: newUser.name });
  }),
  login: ctrlWrapper(async (req: Request, res: Response) => {

  }),
};

export { AuthController };
