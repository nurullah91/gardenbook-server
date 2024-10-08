import { Request, Response } from 'express';
import { messageTemplate } from './messageTemplate';
import { PaymentServices } from './payment.service';
import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';

const createPayment = handleAsync(async (req, res) => {
  const result = await PaymentServices.createPayment(req.body);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment initiated successfully',
    data: result,
  });
});

const updatePayment = handleAsync(async (req, res) => {
  const bookingId = req.params.id;
  const result = await PaymentServices.updatePayment(bookingId, req.body);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment updated successfully',
    data: result,
  });
});

const confirmationController = async (req: Request, res: Response) => {
  const { status, txnId } = req.query;
  await PaymentServices.paymentConfirmation(txnId as string);

  const generateTemplate = messageTemplate(status as string);

  res.send(generateTemplate);
};

export const paymentController = {
  confirmationController,
  createPayment,
  updatePayment,
};
