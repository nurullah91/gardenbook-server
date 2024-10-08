import { TUser } from '../modules/user/user.interface';

export const generateTransactionId = (user: TUser) => {
  // get the last 4 digit of user phone number
  const phonePart = user.phone.slice(-4);
  // Get the last 6 characters of the user's ID
  const idPart = user?._id?.toString().slice(-4);

  // Get the current timestamp
  const timestamp = Date.now().toString();

  // Generate a random string for extra uniqueness
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Combine the parts to form the transaction ID
  const transactionId = `TXN-${idPart}-${phonePart}-${timestamp}-${randomPart}`;

  return transactionId;
};
