import { Sequelize } from "sequelize-typescript";
import config from "./env.config";
import path from "path";

const sequelize = new Sequelize(config.databaseUrl, {
  models: [path.join(__dirname, "../", "models/*.model.ts")],
});

export default sequelize;
