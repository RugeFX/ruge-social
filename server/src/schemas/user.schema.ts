import S from "fluent-json-schema";

export const createUserSchema = {
  body: S.object()
    .prop("email", S.string().required())
    .prop("password", S.string().minLength(8).required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};
