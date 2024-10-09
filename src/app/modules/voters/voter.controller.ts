import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';
import { VoteServices } from './voter.service';

const upvotePost = handleAsync(async (req, res) => {
  const { userId, postId } = req.body;

  const result = await VoteServices.upvotePost(userId, postId);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post upvoted successfully',
    data: result,
  });
});

const downvotePost = handleAsync(async (req, res) => {
  const { userId, postId } = req.body;

  const result = await VoteServices.downvotePost(userId, postId);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post downvoted successfully',
    data: result,
  });
});

const getAllVotersOfPost = handleAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await VoteServices.getAllVotersOfAPost(postId);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All votes are retrieved successfully',
    data: result,
  });
});

export const VoteController = {
  upvotePost,
  downvotePost,
  getAllVotersOfPost,
};
