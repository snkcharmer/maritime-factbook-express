import { Router } from 'express';
import {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
} from './user.controller';
import { paginationMiddleware } from '../../middlewares/pagination.middleware';
import { authenticateToken } from '../../middlewares/auth.middleware';
import { validateRequest } from '../utils/http-handlers';
import {
  DeleteUserSchema,
  GetUserSchema,
  UserCreateSchema,
  UserUpdateSchema,
} from '../../schemas';

const router = Router();

router.use(authenticateToken);

router.get(
  '/:id?',
  paginationMiddleware,
  validateRequest(GetUserSchema),
  getUserController
);
router.post(
  '/',
  //  validateRequest(UserCreateSchema),
  createUserController
);
router.patch('/:id', validateRequest(UserUpdateSchema), updateUserController);
router.delete('/:id', validateRequest(DeleteUserSchema), deleteUserController);

export default router;
