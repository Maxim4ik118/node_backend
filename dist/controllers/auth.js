"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("@/helpers");
const models_1 = require("@/models");
const sendEmail_1 = require("@/helpers/sendEmail");
const nanoid_1 = require("nanoid");
const AuthController = {
    register: (0, helpers_1.ctrlWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existUser = yield models_1.User.exists({ email: req.body.email });
            if (existUser) {
                throw (0, helpers_1.HttpError)(409, "User already exists");
            }
            const hashPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
            const verificationToken = (0, nanoid_1.nanoid)();
            const newUser = yield models_1.User.create(Object.assign(Object.assign({}, req.body), { password: hashPassword, verificationToken }));
            const verifyEmail = {
                to: newUser.email,
                subject: "Verification email",
                html: `<a href="${process.env.PROJECT_URL}/api/auth/verify/${verificationToken}" target="_blank">Click to verify</a>`,
            };
            yield (0, sendEmail_1.sendEmail)(verifyEmail);
            res.status(201).json({ email: newUser.email, name: newUser.name });
        }
        catch (error) {
            next(error);
        }
    })),
    login: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        const savedUser = yield models_1.User.findOne({ email: body.email });
        if (!savedUser) {
            throw (0, helpers_1.HttpError)(400, "There is no account with that email");
        }
        if (!(savedUser === null || savedUser === void 0 ? void 0 : savedUser.verify)) {
            throw (0, helpers_1.HttpError)(401, "Email is not verified");
        }
        const payload = {
            _id: savedUser._id,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        const user = yield models_1.User.findOneAndUpdate({ email: body.email }, { token }, { new: true });
        res.status(200).json({
            user: {
                name: user === null || user === void 0 ? void 0 : user.name,
                email: user === null || user === void 0 ? void 0 : user.email,
                subscription: user === null || user === void 0 ? void 0 : user.subscription,
            },
            token,
        });
    })),
    verify: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const verificationToken = req.params.verificationToken;
        const savedUser = yield models_1.User.findOne({ verificationToken });
        if (!savedUser) {
            throw (0, helpers_1.HttpError)(404, "User not found");
        }
        yield models_1.User.findByIdAndUpdate(savedUser._id, {
            verify: true,
            verificationToken: "",
        });
        res.status(200).json({
            message: "Verification successful",
        });
    })),
    verifyAgain: (0, helpers_1.ctrlWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        const savedUser = yield models_1.User.findOne({ email });
        if (!savedUser) {
            throw (0, helpers_1.HttpError)(404, "Email not found");
        }
        if (savedUser.verify) {
            throw (0, helpers_1.HttpError)(400, "Verification has already been passed");
        }
        const verifyEmail = {
            to: savedUser.email,
            subject: "Verification email",
            html: `<a href="${process.env.PROJECT_URL}/api/auth/verify/${savedUser.verificationToken}" target="_blank">Click to verify</a>`,
        };
        yield (0, sendEmail_1.sendEmail)(verifyEmail);
        res.status(200).json({
            message: "Verification email sent",
        });
    })),
};
exports.AuthController = AuthController;
