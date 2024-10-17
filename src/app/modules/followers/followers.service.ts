import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Followers } from './followers.model';
import { Types } from 'mongoose';

const followUser = async (userId: string, userIdToFollow: string) => {
  const userObjectId = new Types.ObjectId(userId);
  const followUserObjectId = new Types.ObjectId(userIdToFollow);

  // Check if the user already follows the target user
  const userFollowers = await Followers.findOne({ user: userObjectId });

  if (!userFollowers) {
    // If no follower document exists, create one
    await Followers.create({
      user: userObjectId,
      following: [followUserObjectId],
      followers: [],
    });
  } else if (!userFollowers.following.includes(followUserObjectId)) {
    userFollowers.following.push(followUserObjectId);
    await userFollowers.save();
  } else {
    throw new AppError(httpStatus.CONFLICT, 'Already following this user');
  }

  // Update the followee's followers
  const followUserFollowers = await Followers.findOne({
    user: followUserObjectId,
  });

  if (!followUserFollowers) {
    await Followers.create({
      user: followUserObjectId,
      followers: [userObjectId],
      following: [],
    });
  } else if (!followUserFollowers.followers.includes(userObjectId)) {
    followUserFollowers.followers.push(userObjectId);
    await followUserFollowers.save();
  }
};

const unfollowUser = async (userId: string, userIdToUnfollow: string) => {
  const userObjectId = new Types.ObjectId(userId);
  const followUserObjectId = new Types.ObjectId(userIdToUnfollow);

  const userFollowers = await Followers.findOne({ user: userObjectId });

  if (!userFollowers || !userFollowers.following.includes(followUserObjectId)) {
    throw new AppError(httpStatus.NOT_FOUND, 'You are not following this user');
  }

  userFollowers.following = userFollowers.following.filter(
    (id) => !id.equals(followUserObjectId),
  );
  await userFollowers.save();

  const followUserFollowers = await Followers.findOne({
    user: followUserObjectId,
  });

  if (
    followUserFollowers &&
    followUserFollowers.followers.includes(userObjectId)
  ) {
    followUserFollowers.followers = followUserFollowers.followers.filter(
      (id) => !id.equals(userObjectId),
    );
    await followUserFollowers.save();
  }
};

const getFollowersAndFollowing = async (userId: string) => {
  const userFollowersData = await Followers.findOne({ user: userId })
    .populate('user')
    .populate('followers')
    .populate('following');

  if (!userFollowersData) {
    return [];
  }

  return userFollowersData;
};

export const FollowerService = {
  followUser,
  unfollowUser,
  getFollowersAndFollowing,
};
