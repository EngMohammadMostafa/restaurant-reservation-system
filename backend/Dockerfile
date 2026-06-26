# Stage 1: Build Stage (بيئة البناء)
FROM node:24-alpine AS builder

# تحديد مسار العمل داخل الحاوية
WORKDIR /app

# نسخ ملفات الحزم وتثبيت جميع التبعيات (بما فيها الـ devDependencies لبناء الكود)
COPY package*.json ./
RUN npm install

# نسخ إعدادات التايب سكريبت ومجلد الأكواد
COPY tsconfig.json ./
COPY src ./src

# تحويل كود التايب سكريبت إلى جافاسكريبت نقي (سينتج مجلد dist)
RUN npx tsc

# ---------------------------------------------------

# Stage 2: Production Stage (بيئة التشغيل النهائية والنظيفة)
FROM node:24-alpine

WORKDIR /app

# نسخ ملفات الحزم وتثبيت تبعيات الإنتاج فقط (لتقليل الحجم)
COPY package*.json ./
RUN npm install --omit=dev

# نسخ الكود المبني (الجافاسكريبت) من المرحلة الأولى
COPY --from=builder /app/dist ./dist

# فتح المنفذ 3000
EXPOSE 3000

# أمر تشغيل السيرفر
CMD ["node", "dist/server.js"]