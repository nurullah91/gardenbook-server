import { model, Schema } from 'mongoose';
import { TVoters } from './voters.interface';
const VotersSchema: Schema = new Schema<TVoters>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  upVoters: { type: [Schema.Types.ObjectId], ref: 'User' },
  downVoters: { type: [Schema.Types.ObjectId], ref: 'User' },
});

export const Voters = model<TVoters>('Voters', VotersSchema);
