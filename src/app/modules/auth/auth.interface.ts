import { IUser } from '../user/user.interface';

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  user: IUser;
};

export type ILoginUser = {
  email: string;
  password: string;
};
