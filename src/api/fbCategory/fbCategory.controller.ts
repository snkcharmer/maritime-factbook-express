import {
  createFbCategory,
  findFbCategoryById,
  findAllFbCategories,
  updateFbCategoryById,
  deleteFbCategoryById,
} from './fbCategory.service';
import { CustomRequest, CustomResponse } from '../../types/custom';

export const createFbCategoryController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { name } = req.body;

    const fbCategory = await createFbCategory({ name });
    res.status(201).json({ success: true, fbCategory });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input data', details: error });
  }
};

export const getFbCategoryController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    if (id) {
      const fbCategory = await findFbCategoryById(id);

      if (!fbCategory) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      res.json({ success: true, fbCategory });
    } else {
      const fbCategoriesData = await findAllFbCategories(req.query);
      res.json({ success: true, data: fbCategoriesData });
    }
  } catch (error) {
    console.error('Error fetching fbCategory:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export const updateFbCategoryController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedFbCategory = await updateFbCategoryById(id, updatedData);
    if (!updatedFbCategory) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json({ success: true, updatedFbCategory });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Invalid data or ID format', details: error });
  }
};

export const deleteFbCategoryController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedFbCategory = await deleteFbCategoryById(id);
    if (!deletedFbCategory) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
