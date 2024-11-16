import { Router } from 'express';
import { register, login } from './auth.controller';
import {
  validateLogin,
  validateRegister,
} from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
