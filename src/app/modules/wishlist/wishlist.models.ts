import mongoose, { Schema, Types } from 'mongoose';
import { IWishlist } from './wishlist.interface';

const wishlistSchema: Schema<IWishlist> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    product_link: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        key: { type: String, required: true },
      },
    ],
    videos: [
      {
        url: { type: String, required: true },
        key: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);
export default Wishlist;
