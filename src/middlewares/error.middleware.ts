import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/custom-error.interface';

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const details = err.details || null;

  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
  });
};
