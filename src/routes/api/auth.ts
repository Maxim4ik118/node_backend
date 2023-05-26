import express from "express";
import { AuthController } from "../../controllers";
import { validateBody } from "../../middlewares";
import { schemas } from "../../models/User";

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerUserBodySchema),
  AuthController.register
);

router.post(
  "/login",
  validateBody(schemas.loginUserBodySchema),
  AuthController.login
);

export default router;
