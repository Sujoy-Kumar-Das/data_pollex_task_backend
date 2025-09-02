import { model, Schema } from "mongoose";
import { IModule } from "../interface/module.interface";

const moduleSchema = new Schema<IModule>(
  {
    title: {
      type: String,
      required: [true, "Module title is required."],
      trim: true,
      minlength: [10, "Module title must be at least 10 characters long."],
      maxlength: [100, "Module title cannot exceed 100 characters."],
    },
    moduleNumber: {
      type: Number,
      required: [true, "Module number is required."],
      min: [1, "Module number must be at least 1."],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "A module must be associated with a course."],
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
  },
  {
    timestamps: true,
  }
);

export const Module = model<IModule>("Module", moduleSchema);
