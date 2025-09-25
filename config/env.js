import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL,
  serviceName: process.env.SERVICE_NAME,
  userId: process.env.USER_ID,
  secureKey: process.env.SECURE_KEY,
  hostAlias: process.env.HOST_ALIAS,
};