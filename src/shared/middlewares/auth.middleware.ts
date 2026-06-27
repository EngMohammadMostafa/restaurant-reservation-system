import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/app-error';

// تمديد نوع الـ Request الخاص بـ Express ليتسع لبيانات الأدمن بعد فك التشفير
declare global {
  namespace Express {
    interface Request {
      admin?: { username: string };
    }
  }
}

export const protectAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let token: string | undefined;

    // التأكد من وجود التوكن في الـ Authorization Header وصيغته Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('Not authorized, no token provided', 401);
    }

    // فك التشفير والتحقق من التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { username: string };

    // التأكد من أن اليوزر نيم الموجود بالتوكن هو نفسه الأدمن الفعلي
    if (decoded.username !== process.env.ADMIN_USERNAME) {
      throw new AppError('Not authorized, invalid token payload', 401);
    }

    // حفظ بيانات الأدمن في الـ request لتمريرها للخطوة التالية
    req.admin = { username: decoded.username };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token, authorization failed', 401));
    } else {
      next(error);
    }
  }
};