import { Router } from 'express';
import {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
} from './user.controller';
import { paginationMiddleware } from '../../middlewares/pagination.middleware';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/:id?', paginationMiddleware, getUserController);
router.post('/', createUserController);
router.patch('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
