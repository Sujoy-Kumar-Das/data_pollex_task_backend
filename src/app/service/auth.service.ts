import AppError from "../errors/AppError";
import { User } from "../model/user.model";
import { createAccessToken, createRefreshToken } from "../utils/createJwtToken";

const login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const findUser = await User.findOne({ email }).select(
    "+isBlocked +isDeleted +password"
  );

  if (!findUser) {
    throw new AppError(404, "This user is not exists");
  }

  if (findUser?.isBlocked) {
    throw new AppError(403, "This user is blocked.");
  }

  if (findUser?.isDeleted) {
    throw new AppError(404, "This user is not found.");
  }

  //   check is the password matched
  const isPasswordMatched = await User.passwordMatched(
    password,
    findUser.password
  );

  if (!isPasswordMatched) {
    throw new AppError(403, "Wrong password.");
  }

  const jwtPayload = {
    role: findUser.role,
    id: findUser._id,
  };

  const accessToken = createAccessToken({ payload: jwtPayload });

  const refreshToken = createRefreshToken({ payload: jwtPayload });

  return {
    accessToken,
    refreshToken,
  };
};

const authService = {
  login,
};

export default authService;
