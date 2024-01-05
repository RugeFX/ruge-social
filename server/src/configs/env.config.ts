import "dotenv/config";

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  databaseUrl:
    process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/ruge_social",
  jwtSecret: process.env.JWT_SECRET || "SECRET-KEY",
};

export default config;
