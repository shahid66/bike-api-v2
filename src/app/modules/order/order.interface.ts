import mongoose from 'mongoose';
export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  subtotal: number;
  discount: number;
  couponCode: string;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  addressData: {
    name: string;
    email: string;
    address: string;
    phone: string;
    city: string;
  };
  deliveryCharge: number;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  
  };

  createdAt?: Date;
  updatedAt?: Date;
}
