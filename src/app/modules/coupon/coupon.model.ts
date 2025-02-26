import mongoose from 'mongoose';
import { ICoupon } from './coupon.interface';

const CouponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountPercentage: { type: Number, required: true },
    minimumOrderValue: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const CouponModel = mongoose.model<ICoupon>('Coupon', CouponSchema);
