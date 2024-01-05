import "dotenv/config";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import cors from "@fastify/cors";
import postRouter from "../routes/post.router";
import authRouter from "../routes/auth.router";
import jwtAuthentication from "../plugins/jwt-authentication";
import { EmptyResultError, ValidationError } from "sequelize";
import ClientError from "../exceptions/ClientError";

export default async function buildFastifyApp() {
  const app: FastifyInstance = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  app.setErrorHandler(async (error, request, reply) => {
    app.log.error(error.name);
    if (error instanceof ValidationError) {
      return reply.status(400).send(error);
    } else if (error instanceof ClientError) {
      return reply.status(400).send(error);
    } else if (error instanceof EmptyResultError) {
      return reply.status(404).send(error);
    }
    app.log.error(error);
    return reply.send(error);
  });

  app.get("/", async () => {
    return { data: "Hello world" };
  });
  // Register app plugins
  app.register(cors);
  app.register(jwtAuthentication);
  // Register app routes
  app.register(authRouter, { prefix: "/api/auth" });
  app.register(postRouter, { prefix: "/api/posts" });

  return app;
}
