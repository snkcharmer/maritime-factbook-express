import { Router } from 'express';
import {
  createFbSubCategoryController,
  getFbSubCategoryController,
  updateFbSubCategoryController,
  deleteFbSubCategoryController,
  getFbSubCategoriesByCategoryIdController,
} from './fbSubCategory.controller';
import { paginationMiddleware } from '../../middlewares/pagination.middleware';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/:id?', paginationMiddleware, getFbSubCategoryController);
router.post('/', createFbSubCategoryController);
router.patch('/:id', updateFbSubCategoryController);
router.delete('/:id', deleteFbSubCategoryController);
router.get('/category/:fbCategoryId', getFbSubCategoriesByCategoryIdController);

export default router;
