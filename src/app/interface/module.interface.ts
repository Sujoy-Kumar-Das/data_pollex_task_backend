import { Types } from "mongoose";

export interface IModule {
  _id?: Types.ObjectId;
  title: string;
  moduleNumber: number;
  course: Types.ObjectId;
  isDeleted: boolean;
  status: "published" | "upcoming";
}
