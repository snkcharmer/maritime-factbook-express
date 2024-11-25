import { Request, Response, NextFunction } from 'express';
import { env } from '../config/environment';

export const verifyApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isSecure = env.secure === 'true';
  // Skip verification for preflight requests
  if (req.method === 'OPTIONS') {
    return next();
  }

  if (!isSecure) {
    console.warn('SECURE mode is disabled. Skipping API key verification.');
    return next();
  }

  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    res.status(401).json({ message: 'API key is missing' });
    return;
  }

  if (apiKey !== env.apiKey) {
    res.status(403).json({ message: 'Invalid API key' });
    return;
  }

  next();
};
