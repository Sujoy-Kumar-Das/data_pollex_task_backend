import AppError from "../errors/AppError";
import { IUser } from "../interface/user.interface";
import { User } from "../model/user.model";

const createStudent = async (payload: IUser) => {
  const { name, email, password } = payload;
  const existsUser = await User.findOne({ email });

  if (existsUser) {
    throw new AppError(409, `${existsUser.name} already have an account.`);
  }

  const result = await User.create({ name, email, password, role: "student" });

  if (!result._id) {
    throw new AppError(400, "Failed to create user");
  }

  return existsUser;
};

const userService = {
  createStudent,
};

export default userService;
