import AppError from "../errors/AppError";
import { ICourse } from "../interface/course.interface";
import { Course } from "../model/course.model";

const create = async (payload: ICourse) => {
  const result = await Course.create(payload);

  if (!result._id) {
    throw new AppError(409, "Flailed to create course.");
  }

  return result;
};

const courseService = {
  create,
};

export default courseService;
