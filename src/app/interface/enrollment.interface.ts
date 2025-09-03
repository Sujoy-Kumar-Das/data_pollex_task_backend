import { Types } from "mongoose";

export interface ICourseEnrollment {
  _id?: string;
  user: Types.ObjectId;
  course: Types.ObjectId;
  isCompleted: boolean;
  unlockedLectures: Types.ObjectId[];
}
