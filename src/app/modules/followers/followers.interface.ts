import { Types } from 'mongoose';

export type TFollowers = {
  _id: string;
  user: Types.ObjectId;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
};
