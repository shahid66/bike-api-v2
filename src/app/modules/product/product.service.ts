import QueryBuilder from '../../builder/QueryBuilder';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { ProductSearchableFields } from './product.constant';
import { IProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: IProduct, files: any) => {
  if (files) {
    const uploadedFiles = files.map((file: any) => ({
      imageName: file.filename,
      path: file.path,
    }));

    //send image to cloudinary
    const cloudinaryResponses = await sendImagesToCloudinary(uploadedFiles);
    const images = cloudinaryResponses.map((res) => res.secure_url);
    product.images = images;
  }

  const result = await ProductModel.create(product);
  return result;
};
const updateProductFromDB = async (
  id: string,
  productData: IProduct,
  files: any,
) => {
  if (files) {
    const uploadedFiles = files.map((file: any) => ({
      imageName: file.filename,
      path: file.path,
    }));

    //send image to cloudinary
    const cloudinaryResponses = await sendImagesToCloudinary(uploadedFiles);
    const images = cloudinaryResponses.map((res) => res.secure_url);
    productData.images = images;
  }

  const result = await ProductModel.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(ProductModel.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
