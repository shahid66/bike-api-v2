import AppError from '../../errors/AppError';
import { CouponModel } from '../coupon/coupon.model';

import { ProductModel } from '../product/product.model';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';

import httpStatus from 'http-status';
import { OrderModel } from './order.model';
import { orderUtils } from './order.utils';

interface IOrderPayload {
  products: { product: string; quantity: number }[];
  addressData: {
    name: string;
    email: string;
    address: string;
    phone: string;
    city: string;
  };
  couponCode?: string; // Make it optional if not always provided
}

const createOrder = async (
  user: TUser,
  payload: IOrderPayload,

  client_ip: string,
) => {
  const userDetails = await User.findOne({ email: user.email });
  const userData = userDetails as TUser;

  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');

  const { products, couponCode, addressData } = payload;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await ProductModel.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;

        return item;
      }
    }),
  );

  let discountAmount = 0;
  if (couponCode) {
    const coupon = await CouponModel.findOne({ code: couponCode });

    if (!coupon) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid coupon code');
    }

    if (coupon.expiryDate < new Date()) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Coupon has expired');
    }

    if (totalPrice < coupon.minimumOrderValue) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Coupon requires a minimum order of ৳${coupon.minimumOrderValue}`,
      );
    }

    discountAmount = (totalPrice * coupon.discountPercentage) / 100;
    totalPrice -= discountAmount;
  }
  const deliveryCharge = 100;
  const orderSummary = {
    user: userData,
    products: productDetails,
    subtotal: totalPrice + discountAmount,
    discount: discountAmount,
    totalPrice,
    deliveryCharge,
    couponCode: couponCode || null,
    addressData,
  };

  let order = await OrderModel.create(orderSummary);

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice + deliveryCharge,
    order_id: order._id,
    currency: 'BDT',
    customer_name: addressData.name,
    customer_address: addressData.address,
    customer_email: addressData.email,
    customer_phone: addressData.phone,
    customer_city: addressData.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
   
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
        
        
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const getOrders = async () => {
  const data = await OrderModel.find();
  return data;
};
const getUserOrder = async (userId: string) => {
  const data = await OrderModel.find({ user: userId }).populate({
    path: 'products.product',
    model: 'Bike',
    select: 'name price  ', // Fetch specific product fields
  });
  return data;
};

export const OrderServices = {
  createOrder,
  verifyPayment,
  getUserOrder,
  getOrders,
};
