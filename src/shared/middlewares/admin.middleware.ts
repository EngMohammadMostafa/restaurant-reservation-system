import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader !== 'Bearer admin-secret-token') {
    return next(new AppError('Access Denied: Admin privileges required.', 403));
  }
  
  next();
};