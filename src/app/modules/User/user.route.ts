/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

import auth from '../../middleware/auth';
import { uploadLocal } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',

  UserControllers.createUser,
);
router.get(
  '/:userId',

  UserControllers.getUser,
);
router.put(
  '/update-user',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  uploadLocal.array('images'),
  UserControllers.updateUser,
);

export const UserRoutes = router;
