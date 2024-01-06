import buildFastifyApp from "./configs/app.config";
import sequelize from "./configs/db.config";
import config from "./configs/env.config";

const start = async () => {
  try {
    // Initialize database with sequelize
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    // Start the app
    const app = await buildFastifyApp();
    await app.listen({ port: config.port });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
