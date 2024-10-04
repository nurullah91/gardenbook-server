import { User } from './user.model';

export const isUserExistsByEmail = async (email: string) => {
  const user = await User.findOne({ email }).select('+password');
  return user;
};
