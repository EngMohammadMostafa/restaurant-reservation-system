import { z } from 'zod';

// مخطط إنشاء حجز جديد (للزبائن)
export const createReservationSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().trim().email({ message: 'Invalid email address' }), // <--- التحقق من الإيميل
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' }),
  time: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Time must be in HH:MM format' }),
  guests: z.number().int().positive({ message: 'Number of guests must be a positive integer' }),
});

// مخطط تحديث حالة الحجز (للأدمن)
export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled'], { 
    message: 'Status must be either pending, confirmed, or cancelled' 
  }),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;