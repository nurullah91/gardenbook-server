import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { commentSchema } from './comment.validation';
import { CommentController } from './comment.controller';
import checkAuth from '../../middlewares/checkAuth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(commentSchema.createCommentSchema),
  CommentController.createComment,
);

router.get('/:postId', CommentController.getAllComments);

router.delete(
  '/:commentId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  CommentController.deleteSingleComment,
);

router.post(
  '/vote/:commentId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  CommentController.voteOnComment,
);
router.patch(
  '/update/:commentId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(commentSchema.updateCommentSchema),
  CommentController.updateComment,
);
export const CommentRoutes = router;
