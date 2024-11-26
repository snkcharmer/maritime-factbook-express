import { IFbCategory } from '../../interfaces/fbCategory.interface';
import { FbCategory } from './fbCategory.model';

export const createFbCategory = async (categoryData: Partial<IFbCategory>) => {
  return FbCategory.create(categoryData);
};

export const findFbCategoryById = async (id: string) => {
  return FbCategory.findById(id).exec();
};

export const findAllFbCategories = async (query: any) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  const categories = await FbCategory.find()
    .skip(Number(skip))
    .limit(Number(limit))
    .exec();

  const total = await FbCategory.countDocuments().exec();

  return {
    tables: categories,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

export const updateFbCategoryById = async (id: string, data: any) => {
  return FbCategory.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteFbCategoryById = async (id: string) => {
  return FbCategory.findByIdAndDelete(id).exec();
};
