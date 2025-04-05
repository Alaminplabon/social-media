import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { postService } from './post.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { uploadManyToS3 } from '../../utils/s3';
import { UploadedFiles } from '../../interface/common.interface';

const createpost = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  if (req.files) {
    const { images, videos } = req.files as UploadedFiles;
    if (images) {
      const imgsArray: { file: any; path: string; key?: string }[] = [];

      images?.map(async image => {
        imgsArray.push({
          file: image,
          path: `images/banner`,
        });
      });
      req.body.images = await uploadManyToS3(imgsArray);
    }
  }
  req.body.userId = userId;
  const newPost = await postService.createpost(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully',
    data: newPost,
  });
});

const getAllpost = catchAsync(async (req: Request, res: Response) => {
  const posts = await postService.getAllpost(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts fetched successfully',
    data: posts,
  });
});

const getpostById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postService.getpostById(id, req.query);

  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post fetched successfully',
    data: post,
  });
});

const updatepost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedPost = await postService.updatepost(id, req.body);

  if (!updatedPost) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: updatedPost,
  });
});

const deletepost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedPost = await postService.deletepost(id);

  if (!deletedPost) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
    data: deletedPost,
  });
});

export const postController = {
  createpost,
  getAllpost,
  getpostById,
  updatepost,
  deletepost,
};
