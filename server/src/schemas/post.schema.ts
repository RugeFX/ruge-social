import S from "fluent-json-schema";

export interface CreatePostInterface {
  Body: {
    title?: string;
    body: string;
  };
}

export const createPostSchema = {
  body: S.object().prop("title", S.string()).prop("body", S.string().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};
