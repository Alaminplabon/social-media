import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { IPost } from './post.interface';
import Post from './post.models';

const createpost = async (payload: IPost) => {
  const newPost = await Post.create({ ...payload });
  return newPost;
};

const getAllpost = async (query: Record<string, any>) => {
  const postModel = new QueryBuilder(Post.find(), query)
    .search(['description']) // adjust searchable fields as needed
    .filter()
    .paginate()
    .sort();

  const data: any = await postModel.modelQuery;
  const meta = await postModel.countTotal();

  return { data, meta };
};

const getpostById = async (id: string, query: Record<string, any>) => {
  const postModel = new QueryBuilder(Post.find({ _id: id }), query)
    .filter()
    .paginate()
    .sort();

  const data: any = await postModel.modelQuery;
  const meta = await postModel.countTotal();

  return { data, meta };
};

const updatepost = async (id: string, payload: Partial<IPost>) => {
  const updatedPost = await Post.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedPost;
};

const deletepost = async (id: string) => {
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
};

export const postService = {
  createpost,
  getAllpost,
  getpostById,
  updatepost,
  deletepost,
};
