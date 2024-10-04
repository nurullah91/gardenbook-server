import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from './user.validation';

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

export const UserRoutes = router;
