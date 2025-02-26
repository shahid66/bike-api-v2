import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  OrderControllers.createOrder,
);
router.get(
  '/verify',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  OrderControllers.verifyPayment,
);
router.get(
  '/user-order',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  OrderControllers.getUserOrder,
);

export const OrderRoutes = router;
