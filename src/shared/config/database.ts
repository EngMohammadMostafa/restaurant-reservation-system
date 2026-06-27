import { PrismaClient } from '@prisma/client';

// إنشاء نسخة موحدة من Prisma Client والاتصال بقاعدة البيانات
export const prisma = new PrismaClient();

// دالة للتأكد من نجاح الاتصال عند تشغيل السيرفر
export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('📦 Database connected successfully (SQLite via Prisma).');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};