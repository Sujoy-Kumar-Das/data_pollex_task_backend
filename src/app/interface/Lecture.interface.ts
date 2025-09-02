import { Types } from "mongoose";

export interface ILecture {
  title: string;
  video: string;
  notes?: string[];
  module: Types.ObjectId;
  isDeleted: boolean;
  status: "published" | "upcoming";
  lectureNumber: number;
}
