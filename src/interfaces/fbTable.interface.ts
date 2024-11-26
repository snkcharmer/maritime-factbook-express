import { CategoryEnum } from '../enum';
import { IDefaultAPI } from './others.interface';
import { IUser } from './user.interface';

export interface IFbTable extends IDefaultAPI {
  userId: any;
  category: CategoryEnum | null;
  name: string;
  chartType: string;
  source: string;
  data: any;
  user: IUser;
}
