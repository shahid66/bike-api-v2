import mongoose, { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Bike',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    couponCode: { type: String || null },
    discount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    addressData: {
      name: { type: String },
      email: { type: String },
      address: { type: String },
      city: { type: String },
      phone: { type: String },
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },

    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
      
    },
    
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<IOrder>('Order', OrderSchema);
