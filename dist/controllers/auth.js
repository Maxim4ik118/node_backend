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
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const AuthController = {
    register: (0, helpers_1.ctrlWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existUser = yield models_1.User.exists({ email: req.body.email });
            if (existUser) {
                throw (0, helpers_1.HttpError)(409, "User already exists");
            }
            const hashPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
            const newUser = yield models_1.User.create(Object.assign(Object.assign({}, req.body), { password: hashPassword }));
            const payload = {
                _id: newUser._id,
            };
            console.log("newUser: ", newUser);
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
};
exports.AuthController = AuthController;
