import authService from "../service/auth.service";
import catchAsync from "../utils/asyncCatch";
import sendResponse from "../utils/sendResponse";
import { setCookie } from "../utils/setCookie";

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.login(req.body);

  setCookie({ res, name: "accessToken", value: accessToken });
  setCookie({ res, name: "refreshToken", value: refreshToken });

  sendResponse(res, {
    success: true,
    message: "Login successful",
    statusCode: 200,
    data: user,
  });
});

const authController = {
  login,
};

export default authController;
