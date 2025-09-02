import { startSession } from "mongoose";
import AppError from "../errors/AppError";
import { ILecture } from "../interface/Lecture.interface";
import { Lecture } from "../model/lecture.model";
import { Module } from "../model/module.model";

const create = async (payload: ILecture[]) => {
  if (!payload.length) throw new AppError(400, "No lectures to create");

  const session = await startSession();
  session.startTransaction();

  try {
    const moduleId = payload[0].module;

    const findModule = await Module.findById(moduleId).session(session);
    if (!findModule) throw new AppError(404, "Module is not found");

    // Get the last lecture number
    const lastLecture = await Lecture.findOne({ module: moduleId })
      .sort({ lectureNumber: -1 })
      .select("lectureNumber")
      .session(session);

    let currentLectureNumber = lastLecture ? lastLecture.lectureNumber : 0;

    // modify the array for lecture number
    const newLectures = payload.map((item) => ({
      ...item,
      lectureNumber: ++currentLectureNumber,
    }));

    // Insert all lectures
    const insertedLectures = await Lecture.insertMany(newLectures, { session });

    await session.commitTransaction();
    session.endSession();

    return insertedLectures;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(409, "Failed to save lecture.");
  }
};

const lectureService = {
  create,
};

export default lectureService;
