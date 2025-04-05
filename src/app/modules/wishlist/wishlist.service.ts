import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { IWishlist } from './wishlist.interface';
import Wishlist from './wishlist.models';

const createWishlist = async (payload: IWishlist) => {
  const newWishlist = await Wishlist.create({ ...payload });
  return newWishlist;
};

const getAllWishlists = async (query: Record<string, any>) => {
  const wishlistModel = new QueryBuilder(Wishlist.find(), query)
    .search(['user', 'description'])
    .filter()
    .paginate()
    .sort();

  const data: any = await wishlistModel.modelQuery;
  const meta = await wishlistModel.countTotal();

  return { data, meta };
};

const getWishlistById = async (id: string, query: Record<string, any>) => {
  const wishlistModel = new QueryBuilder(Wishlist.find({ _id: id }), query)
    .filter()
    .paginate()
    .sort();

  const data: any = await wishlistModel.modelQuery;
  const meta = await wishlistModel.countTotal();

  return { data, meta };
};

const updateWishlist = async (id: string, payload: Partial<IWishlist>) => {
  const updatedWishlist = await Wishlist.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedWishlist;
};

const deleteWishlist = async (id: string) => {
  const deletedWishlist = await Wishlist.findByIdAndDelete(id);
  return deletedWishlist;
};

export const wishlistService = {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
};
