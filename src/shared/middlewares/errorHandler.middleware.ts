import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  // طباعة الخطأ في الـ Console للتطوير
  console.error(`[ERROR] [${req.method}] ${req.url} -> ${message}`);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};