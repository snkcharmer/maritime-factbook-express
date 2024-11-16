import { NextFunction } from 'express';
import { z } from 'zod';
import { LoginSchema } from '../schemas';
import jwt from 'jsonwebtoken';
import { env } from '../config/environment';
import { CustomRequest, CustomResponse } from '../types/custom';

const RegisterSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const validateRegister = (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
): void => {
  try {
    RegisterSchema.parse(req.body); // Throws an error if validation fails
    next(); // Proceed to the next function (register controller)
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const validateLogin = (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
): void => {
  try {
    LoginSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const authenticateToken = (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, String(env.jwtSecret));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
  console.log('Response:', req);
};
