import { model, Schema } from 'mongoose';
import { TComment } from './comments.interface';

const CommentSchema: Schema = new Schema<TComment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  comment: { type: String, required: true },
  upVoters: { type: [Schema.Types.ObjectId], ref: 'User' },
  downVoters: { type: [Schema.Types.ObjectId], ref: 'User' },
});

export const Comment = model<TComment>('Comment', CommentSchema);
