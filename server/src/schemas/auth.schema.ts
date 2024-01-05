import S from "fluent-json-schema";

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

export const loginSchema = {
  body: S.object().prop("username", S.string().required()).prop("password", S.string().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};

export const registerSchema = {
  body: S.object().prop("username", S.string().required()).prop("password", S.string().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};
