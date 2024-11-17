import { NextFunction } from 'express';
import logger from '../config/logger';
import { CustomRequest, CustomResponse } from '../types/custom';

export const reqLogger = (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
) => {
  logger.info({
    message: `${req.method} ${req.originalUrl}`,
    method: req.method,
    url: req.originalUrl,
    status: 'incoming request',
  });

  const originalSend = res.send;

  res.send = function (this: CustomResponse, body: any): CustomResponse {
    logger.info({
      message: 'Response sent',
      body,
      status: res.statusCode,
      method: req.method,
      url: req.originalUrl,
    });

    return originalSend.call(this, body);
  };

  next();
};
