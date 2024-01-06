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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authorization = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (authorization === undefined) {
        next((0, helpers_1.HttpError)(401, "Invalid Bearer"));
        return;
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer")
        next((0, helpers_1.HttpError)(401, "Invalid Bearer"));
    try {
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield models_1.User.findById(_id);
        if (!user || !user.token || user.token !== token) {
            next((0, helpers_1.HttpError)(401, "Invalid Bearer"));
        }
        // @ts-ignore
        req.user = user;
        next();
    }
    catch (err) {
        next((0, helpers_1.HttpError)(401, "Invalid Bearer"));
    }
});
exports.authenticate = authenticate;
