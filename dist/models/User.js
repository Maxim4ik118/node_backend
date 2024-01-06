"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.User = exports.UserSubscription = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
exports.UserSubscription = {
    STARTER: "starter",
    PRO: "pro",
    BUSINESS: "business",
};
const userSubscriptions = [
    exports.UserSubscription.STARTER,
    exports.UserSubscription.PRO,
    exports.UserSubscription.BUSINESS,
];
const emailValidateRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const userSchema = new mongoose_1.Schema({
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
}, { versionKey: false, timestamps: true });
userSchema.post("save", helpers_1.handleMongooseError);
const registerUserBodySchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().pattern(emailValidateRegex).required(),
    password: joi_1.default.string().min(6).required(),
    subscription: joi_1.default.string().allow("starter", "pro", "business"),
});
const loginUserBodySchema = joi_1.default.object({
    email: joi_1.default.string().pattern(emailValidateRegex).required(),
    password: joi_1.default.string().min(6).required(),
});
const schemas = {
    registerUserBodySchema,
    loginUserBodySchema,
};
exports.schemas = schemas;
const User = (0, mongoose_1.model)("user", userSchema);
exports.User = User;
