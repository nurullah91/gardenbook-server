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
    ...payload,
    txnId: transactionId,
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

  const paymentInfo = await Payment.findOne({ txnId }).populate('user');

  let result;
  if (
    verifyPaymentResponse &&
    verifyPaymentResponse.pay_status === 'Successful'
  ) {
    result = await Payment.findByIdAndUpdate(paymentInfo?._id, {
      paymentStatus: 'paid',
    }).populate('user');

    const today = new Date();
    const planValidity = new Date(today.setDate(today.getDate() + 30));

    // update user plan and plan validity
    await User.findByIdAndUpdate(paymentInfo?.user?._id, {
      plan: 'premium',
      planValidity,
    });
  }
  return result;
};

const getAllPaymentsFromDB = async (query: Record<string, unknown>) => {
  const allPaymentsQuery = new QueryBuilder(
    Payment.find({ isDeleted: false }).populate('user'),
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

// Fetch monthly payments aggregated by month
const getMonthlyPaymentsFromDB = async () => {
  const monthlyPayments = await Payment.aggregate([
    {
      $match: { paymentStatus: 'paid' },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalAmount: { $sum: '$amount' },
        paymentCount: { $sum: 1 },
      },
    },
    {
      $addFields: {
        month: {
          $let: {
            vars: {
              months: [
                '',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
            },
            in: {
              $arrayElemAt: ['$$months', '$_id'], // Map month number to month name
            },
          },
        },
      },
    },
    { $project: { _id: 0, month: 1, totalAmount: 1, paymentCount: 1 } }, // Hide _id, return month instead
    { $sort: { month: 1 } },
  ]);

  return monthlyPayments;
};

export const PaymentServices = {
  createPayment,
  updatePayment,
  getMonthlyPaymentsFromDB,
  getAllPaymentsFromDB,
  paymentConfirmation,
};
