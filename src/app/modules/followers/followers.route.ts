import express from 'express';
import { FollowerController } from './followers.controller';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { followValidationSchema } from './followers.validation';
import checkAuth from '../../middlewares/checkAuth';

const router = express.Router();

router.get(
  '/followers-following/:userId',
  FollowerController.getFollowersAndFollowing,
);

router.post(
  '/follow-user',
  checkAuth(USER_ROLE.user),
  validateRequest(followValidationSchema.followSchema),
  FollowerController.followUser,
);

router.post(
  '/unfollow-user',
  checkAuth(USER_ROLE.user),
  validateRequest(followValidationSchema.followSchema),
  FollowerController.followUser,
);

export const FollowerRoutes = router;
