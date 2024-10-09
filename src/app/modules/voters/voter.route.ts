import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { votersValidationSchema } from './voter.validation';
import { VoteController } from './voter.controller';
import checkAuth from '../../middlewares/checkAuth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/upvote',
  checkAuth(USER_ROLE.user),
  validateRequest(votersValidationSchema.votersSchema),
  VoteController.upvotePost,
);
router.post(
  '/downvote',
  checkAuth(USER_ROLE.user),
  validateRequest(votersValidationSchema.votersSchema),
  VoteController.downvotePost,
);
router.get(
  '/:postId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  VoteController.getAllVotersOfPost,
);
export const VoterRoutes = router;
