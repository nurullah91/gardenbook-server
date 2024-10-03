import { Types } from 'mongoose';

export type TVoters = {
  _id: string;
  post: Types.ObjectId;
  upVoters: Types.ObjectId[];
  downVoters: Types.ObjectId[];
};
