import { ServerError } from "../models";
import { CallbackWithoutResultAndOptionalError } from "mongoose";

const handleMongooseError = (
  error: NativeError,
  data: unknown,
  next: CallbackWithoutResultAndOptionalError
) => {
  const err = error as ServerError;
  err.status = 400;

  next();
};

export { handleMongooseError };
