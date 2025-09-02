import { Types } from "mongoose";

export interface ICourse {
  _id?: Types.ObjectId;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  status: boolean;
  isDeleted: boolean;
  user: Types.ObjectId;
}
