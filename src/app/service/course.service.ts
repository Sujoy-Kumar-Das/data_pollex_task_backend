import AppError from "../errors/AppError";
import { ICourse } from "../interface/course.interface";
import { Course } from "../model/course.model";
import { CourseEnrollment } from "../model/enrollment.model";
import { Lecture } from "../model/lecture.model";
import { Module } from "../model/module.model";

const create = async (payload: ICourse) => {
  const result = await Course.create(payload);

  if (!result._id) {
    throw new AppError(409, "Flailed to create course.");
  }

  return result;
};

const getAll = async () => {
  const result = await Course.find({ isDeleted: false });

  return result;
};

const getSingle = async (id: string) => {
  // todo need to improve. Use aggregation for increase the performance
  const course = await Course.findById(id).lean();

  if (!course) {
    throw new AppError(404, "This course is not found");
  }

  const modules = await Module.find({ course: course._id })
    .select("_id title moduleNumber status")
    .sort({ moduleNumber: 1 })
    .lean();

  const modulesWithLectures = await Promise.all(
    modules.map(async (module) => {
      const lectures = await Lecture.find({ module: module._id })
        .select("_id title lectureNumber status")
        .sort({ lectureNumber: 1 })
        .lean();
      return { ...module, lectures };
    })
  );

  return { ...course, modules: modulesWithLectures };
};

const enroll = async (courseId: string, userId: string) => {
  const findCourse = await Course.findById(courseId);

  if (!findCourse || findCourse.isDeleted) {
    throw new AppError(404, "Course not found.");
  }

  const alreadyEnrolled = await CourseEnrollment.findOne({
    user: userId,
    course: courseId,
  });

  if (alreadyEnrolled) {
    throw new AppError(409, "You have been already enrolled this course.");
  }

  const enrollCourse = await CourseEnrollment.create({
    user: userId,
    course: courseId,
  });

  if (!enrollCourse._id) {
    throw new AppError(409, "Failed to Enroll course.");
  }

  return enrollCourse;
};

const courseService = {
  create,
  getAll,
  getSingle,
  enroll,
};

export default courseService;
