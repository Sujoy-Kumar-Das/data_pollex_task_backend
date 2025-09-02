import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";

const verifyToken = (token: string, secret: string) => {
  try {
    if (!token) {
      throw new AppError(401, "unauthorize access");
    }
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    throw new AppError(401, "Invalid token.Please try again.");
  }
};

export default verifyToken;
