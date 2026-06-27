import { Router } from 'express';
import { login } from './auth.controller';
import { validateBody } from '../../shared/middlewares/validation.middleware';
import { loginSchema } from './auth.schema';

const router = Router();

// مسار تسجيل الدخول مع التحقق من المدخلات عبر Zod
router.post('/login', validateBody(loginSchema), login);

export default router;