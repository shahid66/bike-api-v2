import express from 'express';
import { CouponControllers } from './coupon.controller';

const router = express.Router();

router.post('/', CouponControllers.createCoupon);

router.get('/', CouponControllers.getAllCoupon);

router.get('/:id', CouponControllers.getSingleCoupon);

router.delete('/:id', CouponControllers.deleteCoupon);

export const CouponRoutes = router;
