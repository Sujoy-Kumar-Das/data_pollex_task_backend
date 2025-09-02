import moduleService from "../service/module.service";
import catchAsync from "../utils/asyncCatch";
import sendResponse from "../utils/sendResponse";

const create = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await moduleService.create({ ...req.body, course: courseId });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Module created successfully",
    data: result,
  });
});

const moduleController = {
  create,
};

export default moduleController;
