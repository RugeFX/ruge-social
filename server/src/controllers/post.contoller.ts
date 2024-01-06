import { FastifyReply, FastifyRequest } from "fastify";
import Post from "../models/post.model";
import {
  CreatePostInterface,
  DeletePostInterface,
  GetSinglePostInterface,
  UpdatePostInterface,
} from "../schemas/post.schema";
import { DecodedUserToken } from "../schemas/auth.schema";
import { verifyUUID } from "../lib/model-utils";
import ClientError from "../exceptions/ClientError";

export const getPosts = async (request: FastifyRequest, reply: FastifyReply) => {
  const posts = await Post.findAll();

  reply.status(200).send({ data: posts });
};

export const getPostByID = async (
  request: FastifyRequest<GetSinglePostInterface>,
  reply: FastifyReply
) => {
  const { postId } = request.params;

  verifyUUID(postId);

  const posts = await Post.scope("withRelations").findOne({
    where: {
      id: postId,
    },
  });

  reply.status(200).send({ data: posts });
};

export const createPost = async (
  request: FastifyRequest<CreatePostInterface>,
  reply: FastifyReply
) => {
  const user = request.user as DecodedUserToken;

  const { title, body } = request.body;
  const post = await Post.create({
    ownerId: user.id,
    title,
    body,
  });

  reply.status(200).send({ data: post });
};

export const updatePost = async (
  request: FastifyRequest<UpdatePostInterface>,
  reply: FastifyReply
) => {
  const { postId } = request.params;
  const user = request.user as DecodedUserToken;

  verifyUUID(postId);
  await verifyPostOwner(postId, user.id);

  const [rows, posts] = await Post.update(request.body, {
    where: {
      id: postId,
    },
    returning: true,
  });

  if (rows === 0) {
    throw new ClientError("Record not found.", 404);
  }

  reply.status(200).send({ data: posts[0] });
};

export const deletePost = async (
  request: FastifyRequest<DeletePostInterface>,
  reply: FastifyReply
) => {
  const { postId } = request.params;
  const user = request.user as DecodedUserToken;

  verifyUUID(postId);
  await verifyPostOwner(postId, user.id);

  await Post.destroy({
    where: {
      id: postId,
    },
  });

  reply.code(200).send({
    data: {
      message: "Successfully deleted record.",
      postId,
    },
  });
};

export const verifyPostOwner = async (postId: string, userId: string) => {
  const post = await Post.findOne({
    where: {
      id: postId,
    },
    rejectOnEmpty: true,
  });

  if (post.ownerId !== userId) {
    throw new ClientError("Access is forbidden.", 403);
  }
};
