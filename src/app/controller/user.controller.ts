import userService from "../service/user.service";
import catchAsync from "../utils/asyncCatch";
import sendResponse from "../utils/sendResponse";

const createStudent = catchAsync(async (req, res) => {
  const result = await userService.createStudent(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: `User created successfully`,
    data: result,
  });
});

const userController = {
  createStudent,
};

export default userController;
