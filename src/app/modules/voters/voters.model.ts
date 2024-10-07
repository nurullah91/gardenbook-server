import { model, Schema } from 'mongoose';
import { TVoter } from './voters.interface';

const VoterSchema: Schema<TVoter> = new Schema<TVoter>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  type: { type: String, enum: ['upvote', 'downvote'], required: true },
});

export const Voter = model<TVoter>('Voter', VoterSchema);
