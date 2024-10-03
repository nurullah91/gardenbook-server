import { Types } from 'mongoose';

export type TComment = {
  _id: string;
  post: Types.ObjectId;
  comment: string;
  upVoters: Types.ObjectId[];
  downVoters: Types.ObjectId[];
};
