import { Router } from 'express';
import { register, login, refresh, logout } from './auth.controller';
import {
  validateLogin,
  validateRegister,
} from '../../middlewares/auth.middleware';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
