import ClientError from "../exceptions/ClientError";
import { validate } from "uuid";

export const verifyUUID = (id: string) => {
  const validateId = validate(id);
  if (!validateId) {
    throw new ClientError("Invalid record ID.", 400);
  }
};
