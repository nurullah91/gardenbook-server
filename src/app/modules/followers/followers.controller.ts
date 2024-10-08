import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';
import { FollowerService } from './followers.service';

const followUser = handleAsync(async (req, res) => {
  const { userId, targetUserId } = req.body;

  await FollowerService.followUser(userId, targetUserId);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully followed the user',
    data: {},
  });
});

const unfollowUser = handleAsync(async (req, res) => {
  const { userId, targetUserId } = req.body;

  await FollowerService.unfollowUser(userId, targetUserId);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Unfollow user successful',
    data: {},
  });
});

const getFollowersAndFollowing = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await FollowerService.getFollowersAndFollowing(userId);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully retrieved followers and following',
    data: result,
  });
});

export const FollowerController = {
  followUser,
  unfollowUser,
  getFollowersAndFollowing,
};
