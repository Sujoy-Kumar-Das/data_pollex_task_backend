import { model, Schema } from "mongoose";
import { ICourse } from "../interface/course.interface";

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Course title is required."],
      trim: true,
      minlength: [3, "Course title must be at least 3 characters long."],
    },
    thumbnail: {
      type: String,
      required: [true, "Course thumbnail URL is required."],
    },
    description: {
      type: String,
      required: [true, "Course description is required."],
      minlength: [
        500,
        "Course description must be at least 10 characters long.",
      ],
    },
    price: {
      type: Number,
      required: [true, "Course price is required."],
      min: [0, "Course price must be greater than or equal to 0."],
    },
    status: {
      type: String,
      enum: {
        values: ["published", "upcoming"],
        message: "Status must be either 'published' or 'upcoming'.",
      },
      default: "published",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>("Course", courseSchema);
