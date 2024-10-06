import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { isUserExistsByEmail } from './user.utils';
import { USER_ROLE } from './user.constant';
import { createToken } from '../../utils/jwtToken';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  // check if the user is exist
  const user = await isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist');
  }
  payload.role = USER_ROLE.user;

  const newUser = await User.create(payload);
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,

    phone: newUser.phone,
    address: newUser.address,
    plan: newUser.plan,
    planValidity: newUser.planValidity,
    profilePhoto: newUser.profilePhoto,
    coverPhoto: newUser.coverPhoto,
    status: newUser.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return { accessToken, refreshToken };
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,

    phone: user.phone,
    address: user.address,
    plan: user.plan,
    planValidity: user.planValidity,
    profilePhoto: user.profilePhoto,
    coverPhoto: user.coverPhoto,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = {
  createUserIntoDB,
  loginUser,
};
