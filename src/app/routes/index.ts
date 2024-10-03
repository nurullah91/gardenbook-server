import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const allRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
