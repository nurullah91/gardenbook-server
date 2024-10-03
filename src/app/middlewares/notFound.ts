import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not Found !!',
    error: '',
  });
};

export default notFound;
