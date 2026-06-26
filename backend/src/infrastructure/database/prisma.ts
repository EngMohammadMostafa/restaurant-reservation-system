import { PrismaClient } from '@prisma/client';

// تمرير كائن إعدادات يحتوي على خصائص صالحة لـ Prisma 7
export const prisma = new PrismaClient({
  errorFormat: 'pretty',
});