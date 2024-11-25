import { CategoryEnum } from '../enum';
import { IUser } from './user.interface';

export interface IFbTable {
  _id: string;
  userId: any;
  category: CategoryEnum | null;
  name: string;
  chartType: string;
  source: string;
  data: any;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}
