import {
  createFbSubCategory,
  findFbSubCategoryById,
  findAllFbSubCategories,
  updateFbSubCategoryById,
  deleteFbSubCategoryById,
  findFbSubCategoriesByCategoryId,
} from './fbSubCategory.service';
import { CustomRequest, CustomResponse } from '../../types/custom';

export const createFbSubCategoryController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { fbCategoryId, name } = req.body;

    const fbSubCategory = await createFbSubCategory({ fbCategoryId, name });
    res.status(201).json({ success: true, fbSubCategory });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input data', details: error });
  }
};

export const getFbSubCategoryController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    if (id) {
      const fbSubCategory = await findFbSubCategoryById(id);

      if (!fbSubCategory) {
        res.status(404).json({ error: 'SubCategory not found' });
        return;
      }

      res.json({ success: true, fbSubCategory });
    } else {
      const fbSubCategoriesData = await findAllFbSubCategories(req.query);
      res.json({ success: true, data: fbSubCategoriesData });
    }
  } catch (error) {
    console.error('Error fetching fbSubCategory:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export const updateFbSubCategoryController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedFbSubCategory = await updateFbSubCategoryById(id, updatedData);
    if (!updatedFbSubCategory) {
      res.status(404).json({ error: 'SubCategory not found' });
      return;
    }

    res.json({ success: true, updatedFbSubCategory });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Invalid data or ID format', details: error });
  }
};

export const deleteFbSubCategoryController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedFbSubCategory = await deleteFbSubCategoryById(id);
    if (!deletedFbSubCategory) {
      res.status(404).json({ error: 'SubCategory not found' });
      return;
    }

    res.json({ success: true, message: 'SubCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getFbSubCategoriesByCategoryIdController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { fbCategoryId } = req.params;

    const fbSubCategories = await findFbSubCategoriesByCategoryId(fbCategoryId);

    if (!fbSubCategories || fbSubCategories.length === 0) {
      res
        .status(404)
        .json({ error: 'No subcategories found for this category' });
      return;
    }

    res.json({ success: true, data: fbSubCategories });
  } catch (error) {
    console.error('Error fetching subcategories by category:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};
