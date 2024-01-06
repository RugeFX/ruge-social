import { FastifyInstance } from "fastify";
import {
  createPost,
  deletePost,
  getPostByID,
  getPosts,
  updatePost,
} from "../controllers/post.contoller";
import {
  createPostSchema,
  deletePostSchema,
  getSinglePostSchema,
  updatePostSchema,
} from "../schemas/post.schema";

export default async function postRouter(fastify: FastifyInstance) {
  fastify.get("/", { handler: getPosts });
  fastify.get("/:postId", {
    schema: getSinglePostSchema,
    handler: getPostByID,
  });
  fastify.post("/", {
    schema: createPostSchema,
    handler: createPost,
    onRequest: [fastify.authenticate],
  });
  fastify.put("/:postId", {
    schema: updatePostSchema,
    handler: updatePost,
    onRequest: [fastify.authenticate],
  });
  fastify.delete("/:postId", {
    schema: deletePostSchema,
    handler: deletePost,
    onRequest: [fastify.authenticate],
  });
}
