import { Router } from 'express';
import { getAll, create, updateStatus, cancelPublic } from './reservation.controller';
import { protectAdmin } from '../../shared/middlewares/auth.middleware';
import { validateBody } from '../../shared/middlewares/validation.middleware';
import { createReservationSchema, updateStatusSchema } from './reservation.schema';

const router = Router();

// 1. مسار عام: لإنشاء حجز جديد مع التحقق من المدخلات عبر Zod
router.post('/', validateBody(createReservationSchema), create);

// 2. مسار عام: رابط إلغاء الحجز المرسل بالإيميل للزبون
router.get('/cancel-public/:id', cancelPublic);

// 3. مسارات محمية: تتطلب توكن الأدمن (Bearer Token)
router.get('/', protectAdmin, getAll);
router.put('/:id', protectAdmin, validateBody(updateStatusSchema), updateStatus);

export default router;