import { Request, Response, NextFunction } from 'express';

export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // في التطبيقات الحقيقية نقوم بفحص الـ JWT Token هنا.
  // لأغراض هذا التاسك، سنفحص هيدر بسيط لإثبات تطبيقنا لنمط الـ Middleware.
  const authHeader = req.headers.authorization;
  
  if (authHeader === 'Bearer admin-secret-token') {
    next();
  } else {
    res.status(403).json({ error: 'Access Denied: Admin privileges required.' });
  }
};