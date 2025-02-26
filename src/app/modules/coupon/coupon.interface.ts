


export interface ICoupon extends Document {
  code: string; // Unique coupon code
  discountPercentage: number; // Discount percentage (e.g., 10 for 10%)
  minimumOrderValue: number; // Minimum order value required
  expiryDate: Date; // Expiry date of the coupon
}
