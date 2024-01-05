import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import User from "../models/user.model";
import { LoginInterface, RegisterInterface } from "../schemas/auth.schema";
import { comparePassword, cryptPassword } from "../lib/auth-utils";
import ClientError from "../exceptions/ClientError";

export const getUserInfo = async (request: FastifyRequest, reply: FastifyReply) => {
  const reqUser = request.user;
  request.log.info({ reqUser });

  const userInfo = await User.findOne({ where: { id: reqUser } });

  reply.status(200).send({ data: userInfo });
};

export const loginUser =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest<LoginInterface>, reply: FastifyReply) => {
    const { username, password } = request.body;
    const {
      id,
      roleId,
      password: hashedPassword,
    } = await User.findOne({ where: { username }, rejectOnEmpty: true });

    const compare = await comparePassword(password, hashedPassword);
    if (!compare) {
      throw new ClientError("Incorrect credentials.", 401);
    }

    const token = fastify.jwt.sign({
      id,
      username,
      roleId,
    });

    reply.status(200).send({ data: token });
  };

export const registerUser = async (
  request: FastifyRequest<RegisterInterface>,
  reply: FastifyReply
) => {
  const { username, password } = request.body;

  const hashedPassword = await cryptPassword(password);
  const { id: userId } = await User.create({ username, password: hashedPassword });

  reply.code(201).send({
    data: {
      userId,
    },
  });
};
