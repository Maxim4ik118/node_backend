import { ServerError } from "../models/Error";

export const HttpError = (status: number, message: string) => {
  const error = new Error(message) as ServerError;
  error.status = status;
  return error;
};
