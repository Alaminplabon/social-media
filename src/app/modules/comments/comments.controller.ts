// Controller
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { commentService } from './comments.service';

const createComment = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  req.body.userId = userId;
  const newComment = await commentService.createComment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment created successfully',
    data: newComment,
  });
});

const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const comments = await commentService.getAllComments(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments fetched successfully',
    data: comments,
  });
});

const getCommentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await commentService.getCommentById(id, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment fetched successfully',
    data: comment,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedComment = await commentService.updateComment(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data: updatedComment,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedComment = await commentService.deleteComment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: deletedComment,
  });
});

export const commentController = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
