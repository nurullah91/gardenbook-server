import { UserService } from './user.service';
import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';
const createUser = handleAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created successful',
    data: result,
  });
  res.send(result);
});
const loginUser = handleAsync(async (req, res) => {
  const result = await UserService.loginUser(req.body);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
  res.send(result);
});

export const UserController = {
  createUser,
  loginUser,
};
