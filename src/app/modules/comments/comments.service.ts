// services/comments.service.ts

import { IComments } from './comments.interface';
import Comments from './comments.models';
import QueryBuilder from '../../builder/QueryBuilder';

const createComment = async (payload: IComments) => {
  const newComment = await Comments.create({ ...payload });
  return newComment;
};

const getAllComments = async (query: Record<string, any>) => {
  const commentModel = new QueryBuilder(Comments.find(), query)
    .search(['user'])
    .filter()
    .paginate()
    .sort();

  const data: any = await commentModel.modelQuery;
  const meta = await commentModel.countTotal();

  return { data, meta };
};

const getCommentById = async (id: string, query: Record<string, any>) => {
  const commentModel = new QueryBuilder(Comments.find({ _id: id }), query)
    .filter()
    .paginate()
    .sort();

  const data: any = await commentModel.modelQuery;
  const meta = await commentModel.countTotal();

  return { data, meta };
};

const updateComment = async (id: string, payload: Partial<IComments>) => {
  const updatedComment = await Comments.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedComment;
};

const deleteComment = async (id: string) => {
  const deletedComment = await Comments.findByIdAndDelete(id);
  return deletedComment;
};

export const commentService = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
