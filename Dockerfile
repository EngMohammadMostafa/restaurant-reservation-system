# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# نسخ ملفات الإعدادات وتثبيت المكتبات
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# نسخ بقية ملفات المشروع وعمل Build للـ TypeScript
COPY . .

# تمرير متغير بيئة افتراضي أثناء البناء فقط لترضي بريزما
ENV DATABASE_URL="file:./dev.db"
RUN npx prisma generate
RUN npm run build

# Stage 2: Production env
FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# تثبيت مكتبات الإنتاج فقط (بدون الـ Dev Dependencies) لتقليل الحجم
RUN npm install --omit=dev

# نسخ الكود المترجم والـ Prisma Client من الـ Stage السابق
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# فتح المنفذ الخاص بالسيرفر
EXPOSE 3005

# تشغيل الـ Migration أولاً لإنشاء قاعدة البيانات ثم تشغيل السيرفر
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]