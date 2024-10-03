export type TUser = {
  _id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  phone: string;
  address: string;
  plan: 'basic' | 'premium';
  planValidity?: string;
  profilePhoto?: string;
  coverPhoto: string;
  createdAt?: Date;
  updatedAt?: Date;
};
