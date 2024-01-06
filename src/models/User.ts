import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers";

export const UserSubscription = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
} as const;

const userSubscriptions = [
  UserSubscription.STARTER,
  UserSubscription.PRO,
  UserSubscription.BUSINESS,
] as const;

type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  subscription: "starter" | "pro" | "business";
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
    },
    subscription: {
      type: String,
      enum: userSubscriptions,
      default: "starter",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerUserBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailValidateRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().allow("starter", "pro", "business"),
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

export { User, UserType, schemas };
