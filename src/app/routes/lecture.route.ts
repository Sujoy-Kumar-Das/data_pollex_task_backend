import { Router } from "express";
import { USER_ROLE } from "../constants/user.constant";
import lectureController from "../controller/lectuer.controller";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import lectureValidationSchema from "../validation_schema/lecture.validation_schema";

const router = Router();

router.post(
  "/",
  validateRequest(lectureValidationSchema.create),
  auth(USER_ROLE.admin),
  lectureController.create
);

const lectureRouter = router;

export default lectureRouter;
