import { Model, Types } from 'mongoose';
export interface IComments {
  userId: Types.ObjectId;
  wishlistId: Types.ObjectId;
  comments: string;
}
