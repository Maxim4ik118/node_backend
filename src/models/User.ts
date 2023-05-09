import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers";

type UserType = {
  name: string;
  email: string;
  password: string;
};

const emailValidateRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailValidateRegex,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerUserBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailValidateRegex).required(),
  password: Joi.string().min(6).required(),
});
const loginUserBodySchema = Joi.object({
  email: Joi.string().pattern(emailValidateRegex).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerUserBodySchema,
  loginUserBodySchema,
};

const User = model<UserType>("user", userSchema);

userSchema.post("save", { errorHandler: true }, handleMongooseError);

export { User, UserType, schemas as authShemas };
