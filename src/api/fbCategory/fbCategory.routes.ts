import { Router } from 'express';
import {
  createFbCategoryController,
  getFbCategoryController,
  updateFbCategoryController,
  deleteFbCategoryController,
} from './fbCategory.controller';
import { paginationMiddleware } from '../../middlewares/pagination.middleware';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/:id?', paginationMiddleware, getFbCategoryController);
router.post('/', createFbCategoryController);
router.patch('/:id', updateFbCategoryController);
router.delete('/:id', deleteFbCategoryController);

export default router;
