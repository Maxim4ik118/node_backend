import { Request, Response } from "express";
import { ctrlWrapper } from "../helpers";

const AuthController = {
  register: ctrlWrapper(async (req: Request, res: Response) => {

  }),
  login: ctrlWrapper(async (req: Request, res: Response) => {

  }),
};

export { AuthController };
