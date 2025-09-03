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

const getAll = catchAsync(async (req, res) => {
  const result = await courseService.getAll();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Course fetched successfully",
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await courseService.getSingle(req.params.courseId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Course details fetched successfully",
    data: result,
  });
});

const enroll = catchAsync(async (req, res) => {
  const result = await courseService.enroll(req.params.courseId, req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Course enrolled fetched successfully",
    data: result,
  });
});

const courseController = {
  create,
  getAll,
  getSingle,
  enroll,
};

export default courseController;
