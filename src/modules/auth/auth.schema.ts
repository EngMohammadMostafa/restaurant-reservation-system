import { z } from 'zod';

export const loginSchema = z.object({
  // نضع رسالة الخطأ مباشرة داخل الـ min(1) لتظهر إذا ترك الحقل فارغاً
  username: z.string().trim().min(1, { message: 'Username is required and cannot be empty' }),
  password: z.string().min(1, { message: 'Password is required and cannot be empty' }),
});

export type LoginInput = z.infer<typeof loginSchema>;