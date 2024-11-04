import { UserService } from './user.service';
import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const createUser = handleAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created successful',
    data: result,
  });
});

const getAllUsers = handleAsync(async (req, res) => {
  const result = await UserService.getAllUsers(req.query);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAllOnlineUsers = handleAsync(async (req, res) => {
  const result = await UserService.getAllOnlineUsers(req.query);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Online users retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleUser = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserService.getSingleUserFromDB(userId);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users data retrieved successfully',
    data: result,
  });
});

const updateUser = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserService.updateUserInDB(userId as string, req.body);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created successful',
    data: result,
  });
});

const deleteUser = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserService.deleteUserFromDB(userId as string);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successful',
    data: result,
  });
});

const updateProfile = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const updateDoc = { profilePhoto: req.file?.path };
  const result = await UserService.updateUserInDB(userId as string, updateDoc);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile photo updated successful',
    data: result,
  });
});

const updateCover = handleAsync(async (req, res) => {
  const { userId } = req.params;

  const updateDoc = { coverPhoto: req.file?.path };
  const result = await UserService.updateUserInDB(userId as string, updateDoc);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cover photo updated successful',
    data: result,
  });
});

const loginUser = handleAsync(async (req, res) => {
  const result = await UserService.loginUser(req.body);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
});

const changePassword = handleAsync(async (req, res) => {
  const result = await UserService.changePassword(
    req.user as JwtPayload,
    req.body,
  );
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result,
  });
});

const refreshToken = handleAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token retrieved successfully!',
    data: result,
  });
});

const forgetPassword = handleAsync(async (req, res) => {
  const { email } = req.body;
  const result = await UserService.forgetPassword(email);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset password mail sent successfully!',
    data: result,
  });
});

const resetPassword = handleAsync(async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];

  const result = await UserService.resetPassword(token as string, req.body);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully!',
    data: result,
  });
});

// Controller to get active users
const getActiveUsers = handleAsync(async (req, res) => {
  const result = await UserService.getActiveUsersFromDB();
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active Users retrieved successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getActiveUsers,
  getSingleUser,
  deleteUser,
  updateCover,
  updateProfile,
  loginUser,
  updateUser,
  changePassword,
  forgetPassword,
  refreshToken,
  getAllOnlineUsers,
  resetPassword,
};
