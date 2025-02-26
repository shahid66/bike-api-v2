/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;

  role: 'customer' | 'admin';

  phone?: string;
  address?: string;
  city?: string;
  image?: string;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
