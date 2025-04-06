import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { IPost } from './post.interface';
import Post from './post.models';
import Network from '../network/network.models';

const createpost = async (payload: IPost) => {
  const newPost = await Post.create({ ...payload });
  return newPost;
};

const getAllpost = async (id: string, query: Record<string, any>) => {
  // First, find all accepted friend relationships for the current user.
  const networks = await Network.find({
    $or: [
      { sender: id, status: 'accepted' },
      { receiver: id, status: 'accepted' },
    ],
  });

  // Build an array of friend IDs.
  const friendIds = networks.map(network =>
    network.sender.toString() === id ? network.receiver : network.sender,
  );

  // Build the condition for post visibility:
  const audienceCondition = {
    $or: [
      // Public posts are visible to everyone.
      { audience: 'public' },
      // Posts visible only to the owner.
      { $and: [{ audience: 'private' }, { userId: id }] },
      { $and: [{ audience: 'only-me' }, { userId: id }] },
      // Posts visible to friends.
      { $and: [{ audience: 'friends' }, { userId: { $in: friendIds } }] },
      // Example for friends-except:
      // If you decide to store an array of excluded friend IDs in the post (e.g. "excludedUsers"),
      // you could use a condition like this:
      // { $and: [
      //     { audience: 'friends-except' },
      //     { userId: { $in: friendIds } },
      //     { excludedUsers: { $ne: currentUserId } }
      //   ]
      // }
    ],
  };

  // Use your QueryBuilder to apply additional search, filter, paginate, and sort options.
  const postModel = new QueryBuilder(Post.find(audienceCondition), query)
    .search(['description'])
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
