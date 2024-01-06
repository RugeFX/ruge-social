import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DecodedUserToken, LoginInterface, RegisterInterface } from "../schemas/auth.schema";
import { comparePassword, cryptPassword } from "../lib/auth-utils";
import ClientError from "../exceptions/ClientError";
import User from "../models/user.model";
import Role from "../models/role.model";

export const getUserInfo = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user as DecodedUserToken;

  const userInfo = await User.findOne({
    where: { id: user.id },
    attributes: { exclude: ["password"] },
    include: [Role],
  });

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

    reply.status(200).send({ data: { token } });
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
