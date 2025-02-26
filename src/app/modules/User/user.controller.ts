import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getUserIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const userId = req?.user?.id;



  const result = await UserServices.updateUserIntoDB(
    userId,
    req.body,
    req.files,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User update successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
  getUser,
};
