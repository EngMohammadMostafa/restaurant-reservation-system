import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/app-error';

/**
 * ميدل وير عام للتحقق من صحة مدخلات الـ Body باستخدام مكتبة Zod
 */
export const validateBody = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // التحقق من البيانات وتحديث الـ body بالبيانات المفلترة والصحيحة
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      // التحقق مما إذا كان الخطأ يحتوي على مصفوفة أخطاء تابعة لـ Zod
      if (error && Array.isArray(error.errors)) {
        // استخراج رسائل الخطأ بشكل ديناميكي وآمن تماماً من المترجم
        const errorMessages = error.errors
          .map((err: any) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        
        next(new AppError(`Validation Error: [${errorMessages}]`, 400));
      } else {
        // تمرير أي خطأ آخر غير متوقع إلى الـ Error Handler العام
        next(error);
      }
    }
  };
};