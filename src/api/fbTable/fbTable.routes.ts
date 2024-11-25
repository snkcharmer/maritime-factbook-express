import { Router } from 'express';
import {
  createFbTableController,
  getFbTableController,
  updateFbTableController,
  deleteFbTableController,
} from './fbTable.controller';
import { paginationMiddleware } from '../../middlewares/pagination.middleware';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/:id?', paginationMiddleware, getFbTableController);
router.post('/', createFbTableController);
router.patch('/:id', updateFbTableController);
router.delete('/:id', deleteFbTableController);

export default router;
