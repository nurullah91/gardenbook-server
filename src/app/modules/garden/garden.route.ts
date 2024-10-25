import express from 'express';
import { GardenController } from './garden.controller';
import checkAuth from '../../middlewares/checkAuth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  GardenController.createGardenPlot,
);
router.get(
  '/user/:userId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  GardenController.getGardenPlotsByUser,
);
router.patch(
  '/:plotId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  GardenController.updateGardenPlot,
);
router.delete(
  '/:plotId',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  GardenController.deleteGardenPlot,
);

export const GardenRoutes = router;
