import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.constant';
import handleAsync from '../utils/handleAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const checkAuth = (...requiredRoles: TUserRole[]) => {
  return handleAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.headers.authorization;
      const token = authorization?.split(' ')[1];

      // Check if the token is missing
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
      }

      try {
        // Check if the token is valid
        const decoded = jwt.verify(
          token,
          config.jwt_access_secret as string,
        ) as JwtPayload;
        const { email, role } = decoded;

        const user = await User.isUserExistsByEmail(email);
        if (!user) {
          throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized for this action',
          );
        }

        req.user = decoded as JwtPayload;
        next();
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          // If the token is expired, respond with a 401 error
          throw new AppError(httpStatus.UNAUTHORIZED, 'Token has expired');
        } else {
          // For other token errors, respond with a 401 error
          throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
        }
      }
    },
  );
};

export default checkAuth;
