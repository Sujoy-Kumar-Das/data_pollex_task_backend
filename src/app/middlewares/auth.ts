import config from "../config";
import AppError from "../errors/AppError";
import { IUserRoles } from "../interface/user.roles.interface";
import { User } from "../model/user.model";
import catchAsync from "../utils/asyncCatch";
import verifyToken from "../utils/verifyJwtToken";

const auth = (...requiredRoles: IUserRoles[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new AppError(401, "You are not authorize.");
    }

    const decoded = verifyToken(token, config.access_token_secret as string);

    const { role, id, iat } = decoded;

    const findUser = await User.findUserById(id);

    if (!findUser) {
      throw new AppError(403, "Unauthorized access. This user is not found.");
    }

    if (findUser.isBlocked) {
      throw new AppError(403, "Unauthorized access.This user is blocked");
    }

    if (findUser.isDeleted) {
      throw new AppError(403, "Unauthorized access. This user is not found.");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, "You are not authorize!");
    }

    const { email, role: userRole, _id } = findUser;

    req.user = { email, role: userRole, id: _id };

    next();
  });
};

export default auth;
