import { model, Schema } from 'mongoose';
import { TComment } from './comment.interface';

const CommentSchema: Schema = new Schema<TComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    comment: { type: String, required: true },
    upVoters: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    downVoters: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware
CommentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CommentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
export const Comment = model<TComment>('Comment', CommentSchema);
