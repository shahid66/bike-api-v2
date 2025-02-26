import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const BikeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    images: {
      type: [{ type: String, required: true }],
      required: true,
    },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      required: true,
    },
    model: { type: String, required: true },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a positive number'],
    },
    description: { type: String, required: true },
    offered: { type: String, default: 'no' },
    bestSell: { type: Boolean, default: false },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<IProduct>('Bike', BikeSchema);
