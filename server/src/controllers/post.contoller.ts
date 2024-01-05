import { FastifyReply, FastifyRequest } from "fastify";
import Post from "../models/post.model";
import { CreatePostInterface } from "../schemas/post.schema";

export const getPosts = async (request: FastifyRequest, reply: FastifyReply) => {
  const posts = await Post.findAll();
  reply.status(200).send({ data: posts });
};

export const createPost = async (
  request: FastifyRequest<CreatePostInterface>,
  reply: FastifyReply
) => {
  const user = request.user;
  request.log.info({ user });

  const { title, body } = request.body;
  const post = await Post.create({
    ownerId: "",
    title,
    body,
  });

  reply.status(200).send({ data: post });
};
