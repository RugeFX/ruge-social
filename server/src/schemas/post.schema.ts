import { FastifySchema, RouteShorthandOptions } from "fastify";
import S from "fluent-json-schema";

export interface GetSinglePostInterface {
  Params: { postId: string };
}

export interface CreatePostInterface {
  Body: {
    title?: string;
    body: string;
  };
}

export interface UpdatePostInterface {
  Params: { postId: string };
  Body: {
    title?: string;
    body?: string;
  };
}

export interface DeletePostInterface {
  Params: { postId: string };
}

export const createPostSchema: FastifySchema = {
  body: S.object().prop("title", S.string()).prop("body", S.string().required()),
};

export const updatePostSchema: FastifySchema = {
  body: S.object().prop("title", S.string()).prop("body", S.string()),
  params: S.object().prop("postId", S.string().required()),
};

export const deletePostSchema: FastifySchema = {
  params: S.object().prop("postId", S.string().required()),
};

export const getSinglePostSchema: FastifySchema = {
  params: S.object().prop("postId", S.string().required()),
};
