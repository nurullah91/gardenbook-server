import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from './user.validation';
import { multerUpload } from '../../config/multer.config';
import checkAuth from '../../middlewares/checkAuth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.patch(
  '/update-user/:userId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(userSchema.updateUserSchema),
  UserController.updateUser,
);

router.get('/', checkAuth(USER_ROLE.admin), UserController.getAllUsers);

router.get(
  '/online/all-online-users',
  checkAuth(USER_ROLE.admin),
  UserController.getAllUsers,
);

router.delete(
  '/:userId',
  checkAuth(USER_ROLE.admin),
  UserController.deleteUser,
);

router.get(
  '/:userId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  UserController.getSingleUser,
);

router.get(
  '/active/get-all-users',
  checkAuth(USER_ROLE.admin),
  UserController.getActiveUsers,
);

router.patch(
  '/update-profile/:userId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  multerUpload.single('image'),
  UserController.updateProfile,
);
router.patch(
  '/update-cover/:userId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  multerUpload.single('image'),
  UserController.updateCover,
);

export const UserRoutes = router;
