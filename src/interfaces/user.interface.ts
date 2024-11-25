export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'end_user';
  createdAt?: Date;
  updatedAt?: Date;
}
