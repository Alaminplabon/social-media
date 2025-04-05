import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { wishlistService } from './wishlist.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { uploadManyToS3, uploadToS3 } from '../../utils/s3';
import { UploadedFiles } from '../../interface/common.interface';

const createWishlist = catchAsync(async (req: Request, res: Response) => {
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

    if (videos) {
      const imgsArray: { file: any; path: string; key?: string }[] = [];

      videos?.map(async video => {
        imgsArray.push({
          file: video,
          path: `images/banner`,
        });
      });

      req.body.videos = await uploadManyToS3(imgsArray);
    }
  }
  req.body.userId = userId;
  const newWishlist = await wishlistService.createWishlist(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist created successfully',
    data: newWishlist,
  });
});

const getAllWishlists = catchAsync(async (req: Request, res: Response) => {
  const wishlists = await wishlistService.getAllWishlists(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlists fetched successfully',
    data: wishlists,
  });
});

const getWishlistById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const wishlist = await wishlistService.getWishlistById(id, req.query);

  if (!wishlist) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wishlist not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist fetched successfully',
    data: wishlist,
  });
});

const updateWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedWishlist = await wishlistService.updateWishlist(id, req.body);

  if (!updatedWishlist) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wishlist not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist updated successfully',
    data: updatedWishlist,
  });
});

const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedWishlist = await wishlistService.deleteWishlist(id);

  if (!deletedWishlist) {
    return res.status(404).json({
      status: 'fail',
      message: 'Wishlist not found',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist deleted successfully',
    data: deletedWishlist,
  });
});

export const wishlistController = {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
};
