import courseService from "../service/course.service";
import catchAsync from "../utils/asyncCatch";
import sendResponse from "../utils/sendResponse";

const create = catchAsync(async (req, res) => {
  const result = await courseService.create({ ...req.body, user: req.user.id });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Course created successfully",
    data: result,
  });
});

const courseController = {
  create,
};

export default courseController;
