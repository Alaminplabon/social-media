import mongoose, { Schema, Types } from 'mongoose';
import { IPost } from './post.interface';

const postSchema: Schema<IPost> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
    },
    audience: {
      type: String,
      enum: ['public', 'private', 'friends', 'friends-except', 'only-me'],
      default: 'public',
    },
    images: [
      {
        url: { type: String, required: true },
        key: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;
