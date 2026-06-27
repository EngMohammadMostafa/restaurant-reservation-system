import app from './app';
import { connectDB } from './shared/config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // 1. الاتصال بقاعدة البيانات أولاً
  await connectDB();

  // 2. تشغيل سيرفر الـ Express
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on: http://localhost:${PORT}`);
  });
};

startServer();