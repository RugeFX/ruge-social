import fastifyJwt, { FastifyJwtNamespace } from "@fastify/jwt";
import fp from "fastify-plugin";
import config from "../configs/env.config";

declare module "fastify" {
  interface FastifyInstance extends FastifyJwtNamespace<{ namespace: "security" }> {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

const jwtAuthentication = fp(async (fastify, opts) => {
  fastify.register(fastifyJwt, {
    secret: config.jwtSecret,
  });

  fastify.decorate("authenticate", async (request, reply): Promise<void> => {
    try {
      await request.jwtVerify();
    } catch (e) {
      reply.send(e);
    }
  });
});

export default jwtAuthentication;
