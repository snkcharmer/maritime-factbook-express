import { Request, Response, NextFunction } from 'express';

export const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { page, limit } = req.query;

  if (page && (!Number.isInteger(Number(page)) || Number(page) <= 0)) {
    res.status(400).json({ error: 'Invalid page number' });
    return;
  }

  if (limit && (!Number.isInteger(Number(limit)) || Number(limit) <= 0)) {
    res.status(400).json({ error: 'Invalid limit number' });
    return;
  }

  next();
};
