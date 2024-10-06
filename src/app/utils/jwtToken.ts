import jwt, { JwtPayload } from 'jsonwebtoken';

import AppError from '../errors/AppError';

export type TJwtPayload = {
  _id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  role: 'admin' | 'user';
  phone: string;
  address: string;
  plan: 'basic' | 'premium';
  planValidity?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  status: 'active' | 'blocked';
};

export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string,
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    throw new AppError(401, 'You are not authorized!');
  }
};
