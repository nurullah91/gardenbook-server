import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema: Schema = new Schema<TUser>(
  {
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    plan: { type: String, enum: ['basic', 'premium'], default: 'basic' },
    planValidity: { type: String, default: '' },
    profilePhoto: {
      type: String,
      default:
        'https://res.cloudinary.com/dbwftcxvx/image/upload/v1727985302/image_8_sdrdqj.jpg',
    },
    coverPhoto: {
      type: String,
      default:
        'https://res.cloudinary.com/dbwftcxvx/image/upload/v1727985302/image_9_k8zz66.jpg',
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', UserSchema);
