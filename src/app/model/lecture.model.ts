import { model, Schema } from "mongoose";
import { ILecture } from "../interface/Lecture.interface";

const lectureSchema = new Schema<ILecture>(
  {
    title: {
      type: String,
      required: [true, "Lecture title is required."],
      trim: true,
      minlength: [10, "Lecture title must be at least 10 characters long."],
      maxlength: [100, "Lecture title cannot exceed 100 characters."],
    },
    video: {
      type: String,
      required: [true, "Lecture video URL is required."],
      match: [/^https?:\/\/.+/, "Please provide a valid video URL."],
    },
    notes: {
      type: [String],
      default: [],
    },
    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "Lecture must be associated with a module."],
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    status: {
      type: String,
      enum: {
        values: ["published", "upcoming"],
        message: "Status must be either 'published' or 'upcoming'.",
      },
      default: "published",
    },
    lectureNumber: {
      type: Number,
      required: [true, "Lecture number is required."],
    },
  },
  {
    timestamps: true,
  }
);

export const Lecture = model<ILecture>("Lecture", lectureSchema);
