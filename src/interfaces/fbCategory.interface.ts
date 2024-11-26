import { IFbSubCategory } from './fbSubCategory.interface';
import { IDefaultAPI } from './others.interface';

export interface IFbCategory extends IDefaultAPI {
  name: string;
  subCategories: IFbSubCategory[];
}
