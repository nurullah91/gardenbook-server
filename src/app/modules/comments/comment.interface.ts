import { Types } from 'mongoose';

export type TComment = {
  _id?: string;
  user: Types.ObjectId;
  post: Types.ObjectId;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  upVoters: Types.ObjectId[];
  downVoters: Types.ObjectId[];
};
