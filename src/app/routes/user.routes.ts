import { Router } from "express";
import userController from "../controller/user.controller";
import validateRequest from "../middlewares/validateRequest";
import userValidationSchema from "../validation_schema/user.validation_schema";

const router = Router();

router.post(
  "/student",
  validateRequest(userValidationSchema.createStudent),
  userController.createStudent
);

const userRouter = router;

export default userRouter;
