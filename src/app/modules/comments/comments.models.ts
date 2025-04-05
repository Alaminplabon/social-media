import mongoose, { Schema, Types } from 'mongoose';
import { IComments } from './comments.interface';

const CommentsSchema: Schema<IComments> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    wishlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wishlist',
      required: true,
    },
    comments: { type: String, required: true },
  },
  { timestamps: true },
);

const Comments = mongoose.model<IComments>('Comments', CommentsSchema);
export default Comments;
