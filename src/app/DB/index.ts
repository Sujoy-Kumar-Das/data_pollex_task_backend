import config from "../config";
import { USER_ROLE } from "../constants/user.constant";
import AppError from "../errors/AppError";
import { User } from "../model/user.model";

const seedAdmin = async () => {
  const adminExists = await User.findOne({
    role: USER_ROLE.admin,
  });

  if (!adminExists) {
    try {
      const adminData = {
        name: "LMS Admin",
        email: config.admin_email,
        password: config.admin_password,
        role: USER_ROLE.admin,
      };

      const createAdmin = await User.create(adminData);

      if (!createAdmin._id) {
        throw new AppError(209, "Flailed to create admin.");
      }

      return createAdmin;
    } catch (error) {
      console.log(error);
      throw new AppError(
        209,
        "Something went wrong while creating admin. Please try again."
      );
    }
  }
};

export default seedAdmin;
