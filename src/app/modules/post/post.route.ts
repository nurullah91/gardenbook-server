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
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  multerUpload.array('image'),
  parseBody,
  validateRequest(postSchema.updatePostSchema),
  PostController.createPost,
);

router.get(
  '/',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  PostController.getAllPosts,
);

router.get(
  '/:postId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  PostController.getSinglePost,
);

router.delete('/:postId', PostController.deleteSinglePost);
router.patch(
  '/update-post/:postId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  multerUpload.array('image'),
  parseBody,
  PostController.updatePost,
);
export const PostRoutes = router;
