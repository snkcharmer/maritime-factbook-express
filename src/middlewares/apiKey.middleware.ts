import { Request, Response, NextFunction } from 'express';
import { env } from '../config/environment';

export const verifyApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const clientApiKey = req.headers['x-api-key'];

  if (!clientApiKey || clientApiKey !== env.apiKey) {
    res.status(401).json({ error: 'Invalid or missing API key.' });
    return;
  }

  next();
};
