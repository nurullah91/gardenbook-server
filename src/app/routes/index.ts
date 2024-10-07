import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { PostRoutes } from '../modules/post/post.route';
import { VoterRoutes } from '../modules/voters/voter.route';

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
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
