import { Router } from "express";
import authController from "../controller/auth.controller";
import validateRequest from "../middlewares/validateRequest";
import authValidationSchema from "../validation_schema/auth.validation_schema";

const router = Router();

router.post(
  "/login",
  validateRequest(authValidationSchema.login),
  authController.login
);

const authRouter = router;

export default authRouter;
