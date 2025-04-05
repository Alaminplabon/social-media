import { Model, Types } from 'mongoose';

export interface IUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [x: string]: any;
  status: string;
  username: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  phoneNumber: string;
  password: string;
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth: string;
  image: string;
  role: string;
  isGoogleLogin: boolean;
  address?: string;
  country?: string;
  street?: string;
  state?: string;
  tokenAmount?: number;
  city?: string;
  zipCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  isDeleted: boolean;
  verification: {
    otp: string | number;
    expiresAt: Date;
    status: boolean;
  };
}

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  IsUserExistId(id: string): Promise<IUser>;
  IsUserExistUserName(userName: string): Promise<IUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
