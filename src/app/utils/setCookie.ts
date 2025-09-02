import { Response } from "express";
import config from "../config";

interface SetCookieParams {
  res: Response;
  name: string;
  value: string;
}

export function setCookie({ res, name, value }: SetCookieParams): void {
  const isProduction = config.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    path: "/",
    maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
  };

  res.cookie(name, value, cookieOptions);
}
