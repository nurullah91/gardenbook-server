import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userSchema } from './user.validation';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.patch(
  '/update-user/:userId',
  validateRequest(userSchema.updateUserSchema),
  UserController.updateUser,
);
router.patch(
  '/update-profile/:userId',
  multerUpload.single('image'),
  UserController.updateProfile,
);
router.patch(
  '/update-cover/:userId',
  multerUpload.single('image'),
  UserController.updateCover,
);

export const UserRoutes = router;
