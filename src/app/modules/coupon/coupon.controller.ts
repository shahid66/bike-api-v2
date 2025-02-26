import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CouponServices } from './coupon.service';

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCouponIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon is created successfully',
    data: result,
  });
});
const getAllCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.getAllCouponFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Coupon are retrieved successfully',
    data: result,
  });
});
const getSingleCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CouponServices.getSingleCouponFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon retrieved succesfully',
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CouponServices.deleteCouponFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon is deleted succesfully',
    data: result,
  });
});

export const CouponControllers = {
  createCoupon,
  getAllCoupon,
  getSingleCoupon,

  deleteCoupon,
};
