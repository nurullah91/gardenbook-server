import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { isUserExistsByEmail } from './user.utils';
import { USER_ROLE } from './user.constant';
import { createToken } from '../../utils/jwtToken';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Followers } from '../followers/followers.model';

const createUserIntoDB = async (payload: TUser) => {
  // check if the user is exist
  const user = await isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist');
  }
  payload.role = USER_ROLE.user;

  const newUser = await User.create(payload);

  await Followers.create({ user: newUser._id });

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
    bio: newUser.bio,
    passwordChangedAt: newUser.passwordChangedAt,
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

const getAllUsers = async (query: Record<string, unknown>) => {
  const allUsersQuery = new QueryBuilder(User.find({ isDeleted: false }), query)
    .search(['name', 'email', 'role', 'phone', 'address', 'plan'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await allUsersQuery.countTotal();
  const result = await allUsersQuery.modelQuery;
  return {
    meta,
    result,
  };
};
const getSingleUserFromDB = async (id: string) => {
  const user = User.findById(id);
  return user;
};

const updateUserInDB = async (userId: string, payload: Partial<TUser>) => {
  // Check if the user exists by ID
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update user data
  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user',
    );
  }

  // Return updated tokens and updated user
  return updatedUser;
};
const deleteUserFromDB = async (userId: string) => {
  // Check if the user exists by ID
  const updateUser = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    {
      new: true,
    },
  );

  if (!updateUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete user');
  }

  // Return updated tokens and updated user
  return {};
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
    bio: user.bio,
    passwordChangedAt: user.passwordChangedAt,
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

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

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
    bio: user.bio,
    passwordChangedAt: user.passwordChangedAt,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

// Fetch active users (e.g., users who posted in the last 30 days)
const getActiveUsersFromDB = async () => {
  const activeUsers = await User.aggregate([
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'user',
        as: 'posts',
      },
    },
    {
      $unwind: '$posts', // Unwind the posts array so each post is a separate document
    },
    {
      $match: {
        'posts.createdAt': {
          $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        postCount: { $sum: 1 }, // Count posts for each user
      },
    },
  ]);

  // Populate user details after aggregation
  const populatedUsers = await User.populate(activeUsers, {
    path: '_id',
    select: 'name email',
  });

  return populatedUsers;
};

export const UserService = {
  createUserIntoDB,
  getAllUsers,
  getSingleUserFromDB,
  getActiveUsersFromDB,
  updateUserInDB,
  deleteUserFromDB,
  loginUser,
  refreshToken,
  changePassword,
};
