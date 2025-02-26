import express from 'express';
import { uploadLocal } from '../../utils/sendImageToCloudinary';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', uploadLocal.array('images'), ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProducts);

router.get('/:productId', ProductControllers.getSingleProduct);
router.put(
  '/:productId',
  uploadLocal.array('images'),
  ProductControllers.updateProduct,
);
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
