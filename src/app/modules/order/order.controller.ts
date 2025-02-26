import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from '../User/user.model';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const reqUser = req.user;

  const result = await OrderServices.createOrder(reqUser, req.body, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order Created successfully',
    data: result,
  });
});

const getRevenue = catchAsync(async (req, res) => {
  const totalRevenue = await OrderServices.getRevenueFromDB();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Total revenue calculated successfully',
    data: totalRevenue,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await OrderServices.getOrders();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});
const getUserOrder = catchAsync(async (req, res) => {
  const reqUser = req.user;
  const userData = await User.findOne({ email: reqUser.email });
  const order = await OrderServices.getUserOrder(userData._id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order verified successfully',
    data: order,
  });
});

export const OrderControllers = {
  createOrder,
  getOrders,
  verifyPayment,

  getUserOrder,
};
