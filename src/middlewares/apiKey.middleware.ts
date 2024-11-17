import { Request, Response, NextFunction } from 'express';

export const verifyApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Skip verification for preflight requests
  if (req.method === 'OPTIONS') {
    return next();
  }

  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    res.status(401).json({ message: 'API key is missing' });
    return;
  }

  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({ message: 'Invalid API key' });
    return;
  }

  next();
};
