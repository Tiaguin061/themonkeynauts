export type User = {
  id: string;
  email: string;
  nickname: string;
  roles: string[];
}

export type AppRegisterResponse = {
  player: User;
  token: string;
}

export type AppLoginResponse = {
  token: string;
}