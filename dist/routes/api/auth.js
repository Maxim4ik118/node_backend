"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.post("/register", (0, middlewares_1.validateBody)(models_1.authShemas.registerUserBodySchema), controllers_1.AuthController.register);
router.post("/login", (0, middlewares_1.validateBody)(models_1.authShemas.loginUserBodySchema), controllers_1.AuthController.login);
exports.default = router;
