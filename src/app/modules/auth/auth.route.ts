import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from '../user/user.validation';
import { UserController } from '../user/user.controller';
import checkAuth from '../../middlewares/checkAuth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userSchema.createUserSchema),
  UserController.createUser,
);
router.post(
  '/login',
  validateRequest(userSchema.loginUserSchema),
  UserController.loginUser,
);

router.post(
  '/change-password',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(userSchema.changePasswordValidationSchema),
  UserController.changePassword,
);

router.post('/refresh-token', UserController.refreshToken);
router.post(
  '/forget-password',
  validateRequest(userSchema.forgetPasswordValidationSchema),
  UserController.forgetPassword,
);
router.post(
  '/reset-password',
  validateRequest(userSchema.resetPasswordValidationSchema),
  UserController.resetPassword,
);

export const AuthRoutes = router;
