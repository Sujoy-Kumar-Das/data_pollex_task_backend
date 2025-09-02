import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { IUser, IUserMethods } from "../interface/user.interface";
import hashPassword from "../utils/hashPassword";

// Create user schema
const userSchema = new Schema<IUser, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long."],
      maxlength: [50, "Name cannot exceed 50 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters long."],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    isBlocked: {
      type: Boolean,
      default: false,
      select: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// is user exists statics
userSchema.statics.isUserExists = function (email: string) {
  return User.findOne({ email }).select("+isBlocked +isDeleted");
};

// user method for compare passwords
userSchema.methods.passwordMatched = async function (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// middleware for hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hashPassword(this.password);

  next();
});

export const User = model<IUser, IUserMethods>("User", userSchema);
