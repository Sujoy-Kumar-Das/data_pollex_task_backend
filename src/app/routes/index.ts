import express from "express";
import authRouter from "./auth.route";
import courseRouter from "./course.route";
import moduleRouter from "./module.route";
import userRouter from "./user.routes";
import lectureRouter from "./lecture.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/course",
    route: courseRouter,
  },
  {
    path: "/module",
    route: moduleRouter,
  },
  {
    path: "/lecture",
    route: lectureRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
