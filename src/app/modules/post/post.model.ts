import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const PostSchema: Schema = new Schema<TPost>(
  {
    post: { type: String, required: true },
    postPhotos: { type: [String], required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    contentType: { type: String, enum: ['free', 'premium'], required: true },
    upvoteCount: { type: Number, default: 0 },
    downvoteCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Query Middleware
PostSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

PostSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Post = model<TPost>('Post', PostSchema);
