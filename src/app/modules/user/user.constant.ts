export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
} as const;
export type TUserRole = keyof typeof USER_ROLE;

export const USER_STATUS = {
  ACTIVE: 'active',
  BLOCKED: 'blocked',
} as const;

export const UserSearchableFields = [
  'name',
  'email',
  'phone',
  'role',
  'status',
];
