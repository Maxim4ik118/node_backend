import express from "express";
import { AuthController } from "../../controllers";
import { validateBody } from "../../middlewares";
import { authShemas } from "../../models";

const router = express.Router();

router.post(
  "/register",
  validateBody(authShemas.registerUserBodySchema),
  AuthController.register
);

router.post(
  "/login",
  validateBody(authShemas.loginUserBodySchema),
  AuthController.login
);

export default router;
