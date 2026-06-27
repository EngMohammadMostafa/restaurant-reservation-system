import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';
import reservationRoutes from './modules/reservation/reservation.routes';
import menuRoutes from './modules/menu/menu.routes'; // استيراد موديول المنيو
import { errorHandler } from './shared/middlewares/errorHandler.middleware';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running smoothly!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/menu', menuRoutes); // تفعيل موديول المنيو في السيرفر

app.use(errorHandler);

export default app;