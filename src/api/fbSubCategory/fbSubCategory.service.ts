import { IFbSubCategory } from '../../interfaces/fbSubCategory.interface';
import { transformReferences } from '../../utils/transformRef';
import { FbSubCategory } from './fbSubCategory.model';

export const createFbSubCategory = async (
  subCategoryData: Partial<IFbSubCategory>
) => {
  return FbSubCategory.create(subCategoryData);
};

export const findFbSubCategoryById = async (id: string) => {
  return FbSubCategory.findById(id).populate('fbCategoryId', 'name').exec();
};

export const findAllFbSubCategories = async (query: any) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  const subCategories = await FbSubCategory.find()
    .populate('fbCategoryId', 'name')
    .skip(Number(skip))
    .limit(Number(limit))
    .exec();

  const total = await FbSubCategory.countDocuments().exec();

  const transformedTable = transformReferences(
    subCategories.map((t) => t.toObject()),
    {
      references: ['fbCategoryId'],
      removeOriginal: true,
    }
  );

  return {
    tables: transformedTable,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

export const updateFbSubCategoryById = async (id: string, data: any) => {
  return FbSubCategory.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteFbSubCategoryById = async (id: string) => {
  return FbSubCategory.findByIdAndDelete(id).exec();
};

export const findFbSubCategoriesByCategoryId = async (fbCategoryId: string) => {
  return FbSubCategory.find({ fbCategoryId })
    .populate('fbCategoryId', 'name')
    .exec();
};
