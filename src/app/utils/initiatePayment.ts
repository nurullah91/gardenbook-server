import axios from 'axios';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { TPaymentData } from '../modules/payment/payment.interface';
import config from '../config';

export const initiatePayment = async (paymentData: TPaymentData) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.payment_storeId,
      signature_key: config.payment_signature_key,
      tran_id: paymentData.txnId,
      success_url: `https://gardenbook-server.vercel.app/api/payment/confirmation?txnId=${paymentData.txnId}&status=success`,
      fail_url: `https://gardenbook-server.vercel.app/api/payment/confirmation?status=failed`,
      cancel_url: 'https://gardenbook-client.vercel.app/',
      amount: paymentData.amount,
      currency: 'BDT',
      desc: 'Room Booking Payment',
      cus_name: paymentData.user.name,
      cus_email: paymentData.user.email,
      cus_add1: paymentData.user.address,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: paymentData.user.phone,
      type: 'json',
    });
    return response;
  } catch {
    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      'Payment initiation Failed',
    );
  }
};

export const verifyPayment = async (txnId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.payment_storeId,
        signature_key: config.payment_signature_key,
        type: 'json',
        request_id: txnId,
      },
    });
    return response.data;
  } catch {
    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      'Payment Verification Failed',
    );
  }
};
