import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export interface CustomResponse extends Response {
  customProperty?: string;
}
