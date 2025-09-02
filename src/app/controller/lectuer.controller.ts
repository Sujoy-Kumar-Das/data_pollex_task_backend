import lectureService from "../service/lecturer.service";
import catchAsync from "../utils/asyncCatch";
import sendResponse from "../utils/sendResponse";

const create = catchAsync(async (req, res) => {
  const result = await lectureService.create(req.body.lecture);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Lecture created successfully",
    data: result,
  });
});

const lectureController = {
  create,
};

export default lectureController;
