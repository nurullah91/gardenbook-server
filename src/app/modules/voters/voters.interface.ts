import { Types } from 'mongoose';

export type TVoter = {
  _id?: string;
  user: Types.ObjectId;
  post: Types.ObjectId;
  type: 'upvote' | 'downvote';
};
