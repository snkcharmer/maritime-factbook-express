import { IDefaultAPI } from './others.interface';

export interface IUser extends IDefaultAPI {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'end_user';
}
