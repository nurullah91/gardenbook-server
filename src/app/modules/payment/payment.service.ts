import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TPayment } from './payment.interface';
import { generateTransactionId } from '../../utils/generateTransactionId';
import { Payment } from './payment.model';
import { initiatePayment, verifyPayment } from '../../utils/initiatePayment';
import QueryBuilder from '../../builder/QueryBuilder';

const createPayment = async (payload: TPayment) => {
  const { user } = payload;

  // Validate room
  const userExists = await User.findById(user);
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const transactionId = generateTransactionId(userExists);
  await Payment.create({
    ...payload,
    paymentStatus: 'unpaid',
    txnId: transactionId,
  });

  const paymentInfo = {
    transactionId,
    ...payload,
    user: userExists,
  };
  const paymentData = await initiatePayment(paymentInfo);

  return paymentData.data;
};

const updatePayment = async (
  paymentId: string,
  updateData: Partial<TPayment>,
) => {
  const result = await Payment.findByIdAndUpdate(paymentId, updateData, {
    new: true,
  }).populate('user');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'payment not found');
  }
  return result;
};

const paymentConfirmation = async (txnId: string) => {
  const verifyPaymentResponse = await verifyPayment(txnId);

  let result;
  if (
    verifyPaymentResponse &&
    verifyPaymentResponse.pay_status === 'Successful'
  ) {
    result = await Payment.findOneAndUpdate(
      { txnId },
      {
        paymentStatus: 'paid',
      },
    ).populate('user');
  }
  return result;
};

const getAllPaymentsFromDB = async (query: Record<string, unknown>) => {
  const allPaymentsQuery = new QueryBuilder(
    Payment.find({ isDeleted: false }),
    query,
  )
    .search(['paymentMethod', 'email', 'txnId'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await allPaymentsQuery.countTotal();
  const result = await allPaymentsQuery.modelQuery;
  return {
    meta,
    result,
  };
};
export const PaymentServices = {
  createPayment,
  updatePayment,
  getAllPaymentsFromDB,
  paymentConfirmation,
};
