import express from "express";
import authRouter from "./auth.route";
import courseRouter from "./course.route";
import userRouter from "./user.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
