import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';
import { PostServices } from './post.service';
import { Express } from 'express';

const createPost = handleAsync(async (req, res) => {
  const images = req.files as Express.Multer.File[];

  const postData = req.body;

  if (images?.length) {
    postData.postPhotos = images.map((image) => image.path);
  }
  const result = await PostServices.createPostIntoDB(postData);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post created successful',
    data: result,
  });
});

const updatePost = handleAsync(async (req, res) => {
  const { postId } = req.params;
  const images = req.files as Express.Multer.File[];

  const postData = req.body;

  if (images?.length) {
    postData.postPhotos = images.map((image) => image.path);
  }

  const result = await PostServices.updatePostInDB(postId as string, postData);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post updated successful',
    data: result,
  });
});

export const PostController = {
  createPost,
  updatePost,
};
