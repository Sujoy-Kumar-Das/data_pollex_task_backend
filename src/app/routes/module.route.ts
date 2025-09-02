import { Router } from "express";
import { USER_ROLE } from "../constants/user.constant";
import moduleController from "../controller/module.controller";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import moduleValidationSchema from "../validation_schema/module.validation_schema";

const router = Router();

router.post(
  "/:courseId",
  validateRequest(moduleValidationSchema.create),
  auth(USER_ROLE.admin),
  moduleController.create
);

const moduleRouter = router;

export default moduleRouter;
