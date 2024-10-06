import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

const notFound: RequestHandler = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not Found !!',
    error: '',
  });
};

export default notFound;
