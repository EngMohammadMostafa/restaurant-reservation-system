import express from 'express';
import cors from 'cors'; // استدعاء المكتبة
import reservationRoutes from './presentation/routes/reservationRoutes';

const app = express();

// تفعيل CORS للسماح للفرونت إند بالتواصل مع الباك إند بدون أخطاء
app.use(cors());

// Middleware لتمكين قراءة الـ JSON من الـ Body
app.use(express.json());

// ربط مسارات الحجوزات
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running smoothly on http://localhost:${PORT}`);
  console.log(`Clean Architecture setup is fully operational!`);
});