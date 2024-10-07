import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { postSchema } from './post.validation';
import { PostController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import checkAuth from '../../middlewares/checkAuth';
import { USER_ROLE } from '../user/user.constant';
import { parseBody } from '../../middlewares/parseBody';

const router = express.Router();

router.post(
  '/create-post',
  checkAuth(USER_ROLE.user),
  multerUpload.array('image'),
  parseBody,
  validateRequest(postSchema.updatePostSchema),
  PostController.createPost,
);
router.patch(
  '/update-post/:postId',
  checkAuth(USER_ROLE.user),
  multerUpload.array('image'),
  parseBody,
  PostController.updatePost,
);
export const PostRoutes = router;
