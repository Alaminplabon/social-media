import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

const createfollower = catchAsync(async (req: Request, res: Response) => {});
const getAllfollower = catchAsync(async (req: Request, res: Response) => {});
const getfollowerById = catchAsync(async (req: Request, res: Response) => {});
const updatefollower = catchAsync(async (req: Request, res: Response) => {});
const deletefollower = catchAsync(async (req: Request, res: Response) => {});

export const followerController = {
  createfollower,
  getAllfollower,
  getfollowerById,
  updatefollower,
  deletefollower,
};