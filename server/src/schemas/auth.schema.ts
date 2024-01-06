import type { FastifySchema } from "fastify";
import S from "fluent-json-schema";

export interface DecodedUserToken {
  id: string;
}

export interface LoginInterface {
  Body: {
    username: string;
    password: string;
  };
}

export interface RegisterInterface {
  Body: {
    username: string;
    password: string;
  };
}

export const loginSchema: FastifySchema = {
  body: S.object().prop("username", S.string().required()).prop("password", S.string().required()),
  querystring: S.object(),
  params: S.object(),
  headers: S.object(),
};

export const registerSchema: FastifySchema = {
  body: S.object().prop("username", S.string().required()).prop("password", S.string().required()),
  querystring: S.object(),
  params: S.object(),
  headers: S.object(),
};
