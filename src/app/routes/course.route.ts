import { Router } from "express";
import { USER_ROLE } from "../constants/user.constant";
import courseController from "../controller/course.controller";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import courseValidationSchema from "../validation_schema/couser.validation_schema";

const router = Router();

router.post(
  "/",
  validateRequest(courseValidationSchema.create),
  auth(USER_ROLE.admin),
  courseController.create
);

router.get("/", courseController.getAll);
router.get("/:courseId", courseController.getSingle);

const courseRouter = router;

export default courseRouter;
