import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

interface IJwtPayload {
  id: string;
  role: string;
}

interface ICreateTokenPayload {
  payload: IJwtPayload;
  secret: string;
  options: SignOptions;
}

export const createToken = ({
  payload,
  options,
  secret,
}: ICreateTokenPayload) => {
  return jwt.sign(payload, secret, options);
};

export const createAccessToken = ({ payload }: { payload: IJwtPayload }) => {
  return createToken({
    payload,
    secret: config.access_token_secret as string,
    options: {
      expiresIn: config.access_token_validation as SignOptions["expiresIn"],
    },
  });
};

export const createRefreshToken = ({ payload }: { payload: IJwtPayload }) => {
  return createToken({
    payload,
    secret: config.refresh_token_secret as string,
    options: {
      expiresIn: config.refresh_token_validation as SignOptions["expiresIn"],
    },
  });
};
