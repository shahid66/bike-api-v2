import { ICoupon } from './coupon.interface';
import { CouponModel } from './coupon.model';

const createCouponIntoDB = async (coupon: ICoupon) => {
  const result = await CouponModel.create(coupon);
  return result;
};

const getAllCouponFromDB = async () => {
  const AllCoupon = await CouponModel.find({});

  return AllCoupon;
};

const getSingleCouponFromDB = async (id: string) => {
  const singleCoupon = await CouponModel.findById(id);
  return singleCoupon;
};

const deleteCouponFromDB = async (id: string) => {
  const deleteCoupon = await CouponModel.findByIdAndDelete(id);
  return deleteCoupon;
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponFromDB,
  getSingleCouponFromDB,

  deleteCouponFromDB,
};
