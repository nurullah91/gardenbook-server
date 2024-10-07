import AppError from '../errors/AppError';
import handleAsync from '../utils/handleAsync';

export const parseBody = handleAsync(async (req, res, next) => {
  if (!req.body.data) {
    throw new AppError(400, 'Please provide data in the body under data key');
  }
  req.body = JSON.parse(req.body.data);

  next();
});
