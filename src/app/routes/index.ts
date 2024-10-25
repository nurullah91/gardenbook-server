import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PostRoutes } from '../modules/post/post.route';
import { VoterRoutes } from '../modules/voters/voter.route';
import { CommentRoutes } from '../modules/comments/comment.route';
import { FollowerRoutes } from '../modules/followers/followers.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { GardenRoutes } from '../modules/garden/garden.route';

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
    path: '/follower',
    route: FollowerRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/garden',
    route: GardenRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
