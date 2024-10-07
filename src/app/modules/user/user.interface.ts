/* eslint-disable no-unused-vars */
import { HydratedDocument, Model } from 'mongoose';

export type TUser = {
  password: string;
  _id?: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  role: 'admin' | 'user';
  phone: string;
  address: string;
  plan: 'basic' | 'premium';
  planValidity?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  bio?: string;
  status: 'active' | 'blocked';
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TLoginUser = {
  email: string;
  password: string;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<HydratedDocument<TUser>>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<HydratedDocument<TUser>>;
}
