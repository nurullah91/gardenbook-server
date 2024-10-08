import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';
import { CommentServices } from './comment.service';

const createComment = handleAsync(async (req, res) => {
  const commentData = req.body;
  const result = await CommentServices.createComment(commentData);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment created successfully',
    data: result,
  });
});

const updateComment = handleAsync(async (req, res) => {
  const { commentId } = req.params;
  const commentData = req.body;

  const result = await CommentServices.updateComment(commentId, commentData);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment updated successfully',
    data: result,
  });
});

// Controller to handle voting (upvote/downvote)
const voteOnComment = handleAsync(async (req, res) => {
  const { commentId } = req.params;
  const { voteType, userId } = req.body;

  const result = await CommentServices.voteOnComment(
    commentId,
    userId,
    voteType,
  );

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Comment ${voteType}d successfully`,
    data: result,
  });
});

export const CommentController = {
  createComment,
  updateComment,
  voteOnComment,
};
