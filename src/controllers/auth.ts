import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ctrlWrapper, HttpError } from "@/helpers";
import { User } from "@/models";
import { sendEmail } from "@/helpers/sendEmail";
import { nanoid } from "nanoid";

const AuthController = {
  register: ctrlWrapper(async (req, res, next) => {
    try {
      const existUser = await User.exists({ email: req.body.email });
      if (existUser) {
        throw HttpError(409, "User already exists");
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const verificationToken = nanoid();

      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        verificationToken,
      });

      const verifyEmail = {
        to: newUser.email,
        subject: "Verification email",
        html: `<a href="${process.env.PROJECT_URL}/api/auth/verify/${verificationToken}" target="_blank">Click to verify</a>`,
      };

      await sendEmail(verifyEmail);

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

    if (!savedUser?.verify) {
      throw HttpError(401, "Email is not verified");
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
  verify: ctrlWrapper(async (req, res) => {
    const verificationToken = req.params.verificationToken;
    const savedUser = await User.findOne({ verificationToken });
    if (!savedUser) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(savedUser._id, {
      verify: true,
      verificationToken: "",
    });

    res.status(200).json({
      message: "Verification successful",
    });
  }),
  verifyAgain: ctrlWrapper(async (req, res) => {
    const { email } = req.body as { email: string };

    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      throw HttpError(404, "Email not found");
    }
    if (savedUser.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: savedUser.email,
      subject: "Verification email",
      html: `<a href="${process.env.PROJECT_URL}/api/auth/verify/${savedUser.verificationToken}" target="_blank">Click to verify</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
    });
  }),
};

export { AuthController };
