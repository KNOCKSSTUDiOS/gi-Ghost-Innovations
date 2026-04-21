import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 4000,
  MODE: process.env.NODE_ENV || "development",
  API_KEY: process.env.API_KEY || "",
  DB_URL: process.env.DB_URL || ""
};

