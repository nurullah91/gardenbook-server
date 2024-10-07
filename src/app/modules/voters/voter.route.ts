import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { votersValidationSchema } from './voter.validation';
import { VoteController } from './voter.controller';

const router = express.Router();

router.post(
  '/upvote',
  validateRequest(votersValidationSchema.votersSchema),
  VoteController.upvotePost,
);
router.post(
  '/downvote',
  validateRequest(votersValidationSchema.votersSchema),
  VoteController.downvotePost,
);
export const VoterRoutes = router;
