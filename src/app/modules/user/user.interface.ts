/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUser = {
  _id?: Types.ObjectId;
  email: string;
  password: string;
};

type IUserModelStaticType = {
  isUserExistById(
    id: Types.ObjectId
  ): Promise<Pick<IUser, 'password' | 'email' | '_id'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type IUserModel = IUserModelStaticType &
  Model<IUser, Record<string, unknown>>;
