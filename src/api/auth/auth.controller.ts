import { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from './auth.service';
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

    const { accessToken, refreshToken, user } = await loginUser(
      email,
      password
    );
    if (!accessToken || !refreshToken || !user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user,
    });
    return;
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      res.status(400).json({ error: 'Refresh token is required' });
      return;
    }

    const { accessToken } = await refreshToken(token);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(400).json({ error: 'Invalid or expired refresh token' });
  }
};

export const logout = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    logoutUser(token);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
};
