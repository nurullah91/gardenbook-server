import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import checkAuth from '../../middlewares/checkAuth';
import { paymentSchema } from './payment.validation';
import { paymentController } from './payment.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  checkAuth(USER_ROLE.user),
  validateRequest(paymentSchema.createPaymentSchema),
  paymentController.createPayment,
);

router.get('/', checkAuth(USER_ROLE.admin), paymentController.getAllPayments);
router.get(
  '/get-monthly-payments',
  checkAuth(USER_ROLE.admin),
  paymentController.getMonthlyPayments,
);
// router.get('/', checkAuth(USER_ROLE.admin, USER_ROLE.user), paymentController);
router.patch(
  '/:id',
  checkAuth('admin'),
  validateRequest(paymentSchema.updatePaymentSchema),
  paymentController.updatePayment,
);
router.post('/confirmation', paymentController.confirmationController);

export const PaymentRoutes = router;
