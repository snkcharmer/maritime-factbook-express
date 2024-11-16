import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';
import { RegisterSchema, LoginSchema } from '../../schemas';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: 'Invalid data', details: parsed.error.errors });
      return;
    }

    const { name, email, password } = parsed.data;

    const user = await registerUser(name, email, password);
    if (!user) {
      res.status(400).json({ error: 'User registration failed' });
      return;
    }

    res.status(201).json({ success: true, user });
    return;
  } catch (error) {
    console.error('registration status', error);
    res.status(500).json({ error: 'User registration failed', message: error });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: 'Invalid data', details: parsed.error.errors });
      return;
    }

    const { email, password } = parsed.data;

    const { token, user } = await loginUser(email, password);
    if (!token || !user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    res.status(200).json({
      success: true,
      token,
      user,
    });
    return;
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error });
    return;
  }
};
