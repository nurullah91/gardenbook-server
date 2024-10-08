import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { commentSchema } from './comment.validation';
import { CommentController } from './comment.controller';
import checkAuth from '../../middlewares/checkAuth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create',
  checkAuth(USER_ROLE.user),
  validateRequest(commentSchema.createCommentSchema),
  CommentController.createComment,
);
router.post(
  '/vote/:commentId',
  checkAuth(USER_ROLE.user),
  CommentController.voteOnComment,
);
router.patch(
  '/update/:commentId',
  checkAuth(USER_ROLE.user),
  validateRequest(commentSchema.updateCommentSchema),
  CommentController.updateComment,
);
export const CommentRoutes = router;