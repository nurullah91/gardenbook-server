import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const PostSchema: Schema = new Schema<TPost>({
  post: { type: String, required: true },
  postPhotos: { type: [String], required: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  contentType: { type: String, enum: ['free', 'premium'], required: true },
});

export const Post = model<TPost>('Post', PostSchema);
