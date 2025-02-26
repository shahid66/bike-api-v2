import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body, req.files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created succesfully',
    data: result,
  });
});
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products are retrieved successfully',
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.getSingleProductFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved succesfully',
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.updateProductFromDB(
    productId,
    req.body,
    req.files,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is update succesfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.deleteProductFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted succesfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
