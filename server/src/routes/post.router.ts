import { FastifyInstance } from "fastify";
import { createPost, getPosts } from "../controllers/post.contoller";
import { createPostSchema } from "../schemas/post.schema";

export default async function postRouter(fastify: FastifyInstance) {
  fastify.get("/", { handler: getPosts, onRequest: [fastify.authenticate] });
  fastify.post("/", {
    schema: createPostSchema,
    handler: createPost,
    onRequest: [fastify.authenticate],
  });
}
