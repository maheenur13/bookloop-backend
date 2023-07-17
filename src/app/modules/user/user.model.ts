import bcrypt from 'bcrypt';
import { Schema, Types, model } from 'mongoose';
import config from '../../../config';
import { IUser, IUserModel } from './user.interface';

const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.statics.isUserExistById = async function (
  id: Types.ObjectId
): Promise<Pick<IUser, 'password' | 'email' | '_id'> | null> {
  return await UserModel.findOne(
    { _id: id },
    { email: 1, password: 1, _id: 1 }
  );
};

userSchema.pre('save', async function (next) {
  //hashing user password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

export const UserModel = model<IUser, IUserModel>('User', userSchema);
