import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.salt_round,
  NODE_ENV: process.env.NODE_ENV,
  access_token_secret: process.env.access_token_secret,
  refresh_token_secret: process.env.refresh_token_secret,
  access_token_validation: process.env.access_token_validation,
  refresh_token_validation: process.env.refresh_token_validation,
};
