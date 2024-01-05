import { FastifyInstance } from "fastify";
import { getUserInfo, loginUser, registerUser } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export default async function authRouter(fastify: FastifyInstance) {
  fastify.get("/", { handler: getUserInfo, onRequest: [fastify.authenticate] });
  fastify.post("/login", {
    schema: loginSchema,
    handler: loginUser(fastify),
  });
  fastify.post("/register", {
    schema: registerSchema,
    handler: registerUser,
  });
}
