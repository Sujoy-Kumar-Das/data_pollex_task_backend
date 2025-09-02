import { Model } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  status: "active" | "inactive";
  isDeleted: boolean;
  role: "student" | "admin";
}

export interface IUserMethods extends Model<IUser> {
  findUserByEmail: (email: string) => Promise<IUser | null>;
  passwordMatched: (
    plainPassword: string,
    hashedPassword: string
  ) => Promise<boolean>;
}
