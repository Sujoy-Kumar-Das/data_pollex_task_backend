import AppError from "../errors/AppError";
import { IModule } from "../interface/module.interface";
import { Course } from "../model/course.model";
import { Module } from "../model/module.model";

const create = async (payload: IModule) => {
  const { course } = payload;

  const findCourse = await Course.findById(course);

  if (!findCourse || findCourse.isDeleted) {
    throw new AppError(404, "This course is not found.");
  }

  const modules = await Module.countDocuments({ course });

  const result = await Module.create({ ...payload, moduleNumber: modules + 1 });

  if (!result._id) {
    throw new AppError(409, "Failed to create module.");
  }

  return result;
};

const moduleService = {
  create,
};

export default moduleService;
