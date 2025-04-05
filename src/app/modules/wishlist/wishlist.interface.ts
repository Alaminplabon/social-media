import { Model, Types } from 'mongoose';

interface IImage {
  url: string;
  key: string;
}
interface IVideo {
  url: string;
  key: string;
}
export interface IWishlist {
  userId: Types.ObjectId;
  description: string;
  isDeleted: boolean;
  product_link: string;
  product_price: number;
  images: IImage[];
  videos: IVideo[];
}
