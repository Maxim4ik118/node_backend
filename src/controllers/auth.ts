import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ctrlWrapper, HttpError } from "../helpers";
import { User } from "../models";

const AuthController = {
  register: ctrlWrapper(async (req, res, next) => {
    try {
      const existUser = await User.exists({ email: req.body.email });
      if (existUser) {
        throw HttpError(409, "User already exists");
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
      });

      const payload = {
        _id: newUser._id,
      };
      console.log("newUser: ", newUser);

      res.status(201).json({ email: newUser.email, name: newUser.name });
    } catch (error) {
      next(error);
    }
  }),
  login: ctrlWrapper(async (req, res) => {
    const body = req.body;
    const savedUser = await User.findOne({ email: body.email });
    if (!savedUser) {
      throw HttpError(400, "There is no account with that email");
    }

    const payload = {
      _id: savedUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    const user = await User.findOneAndUpdate(
      { email: body.email },
      { token },
      { new: true }
    );

    res.status(200).json({
      user: {
        name: user?.name,
        email: user?.email,
        subscription: user?.subscription,
      },
      token,
    });
  }),
};

export { AuthController };
