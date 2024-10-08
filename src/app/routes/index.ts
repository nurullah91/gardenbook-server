import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PostRoutes } from '../modules/post/post.route';
import { VoterRoutes } from '../modules/voters/voter.route';
import { CommentRoutes } from '../modules/comments/comment.route';
import { FollowerRoutes } from '../modules/followers/followers.route';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const allRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/vote',
    route: VoterRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/follow',
    route: FollowerRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
