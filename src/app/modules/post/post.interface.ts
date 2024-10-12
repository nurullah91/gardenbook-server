import { Types } from 'mongoose';

export type TPost = {
  _id: string;
  post: string;
  postPhotos?: string[];
  user: Types.ObjectId;
  category: string;
  contentType: 'free' | 'premium';
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  isDeleted: boolean;
};
