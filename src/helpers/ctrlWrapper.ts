import { NextFunction, Request, Response } from "express";

const ctrlWrapper = (
  ctrl: (req: Request, res: Response, next: NextFunction) => void
) => {
  const wrapperFunc = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      ctrl(req, res, next);
    } catch (error) {
      console.log("error1231231: ", error);
      next(error);
    }
  };

  return wrapperFunc;
};

export { ctrlWrapper };
