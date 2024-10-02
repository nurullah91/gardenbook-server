import dotenv from "dotenv";

dotenv.config();
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
};
