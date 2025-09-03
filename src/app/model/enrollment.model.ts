import { model, Schema } from "mongoose";
import { ICourseEnrollment } from "../interface/enrollment.interface";

const courseEnrollmentSchema = new Schema<ICourseEnrollment>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User is required for enroll a course."],
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    required: [true, "Course id is required for enroll a course."],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  unlockedLectures: {
    type: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    default: [],
  },
});

export const CourseEnrollment = model<ICourseEnrollment>(
  "courseEnrollment",
  courseEnrollmentSchema
);
