import { model, Schema } from 'mongoose';
import { TFollowers } from './followers.interface';
const FollowersSchema: Schema = new Schema<TFollowers>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  followers: { type: [Schema.Types.ObjectId], ref: 'User' },
  following: { type: [Schema.Types.ObjectId], ref: 'User' },
});

export const Followers = model<TFollowers>('Followers', FollowersSchema);
