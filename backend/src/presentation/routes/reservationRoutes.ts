import { Router } from 'express';
import { InMemoryReservationRepository } from '../../infrastructure/database/InMemoryReservationRepository';
import { ConsoleEmailService } from '../../infrastructure/email/ConsoleEmailService';
import { GetReservationsUseCase } from '../../application/use-cases/GetReservationsUseCase';
import { CreateReservationUseCase } from '../../application/use-cases/CreateReservationUseCase';
import { UpdateReservationStatusUseCase } from '../../application/use-cases/UpdateReservationStatusUseCase';
import { ReservationController } from '../controllers/ReservationController';
import { adminAuthMiddleware } from '../middlewares/adminAuth';

const router = Router();

// 1. تعريف البنية التحتية (تم التبديل إلى In-Memory بكل سهولة!)
const reservationRepository = new InMemoryReservationRepository();
const emailService = new ConsoleEmailService();

// 2. حقن البنية التحتية داخل طبقة التطبيق
const getReservationsUC = new GetReservationsUseCase(reservationRepository);
const createReservationUC = new CreateReservationUseCase(reservationRepository, emailService);
const updateReservationStatusUC = new UpdateReservationStatusUseCase(reservationRepository);

// 3. حقن حالات الاستخدام داخل الـ Controller
const reservationController = new ReservationController(
  getReservationsUC,
  createReservationUC,
  updateReservationStatusUC
);

// 4. تعريف المسارات (Routes)
router.get('/', reservationController.getAll);
router.post('/', reservationController.create);
router.put('/:id', adminAuthMiddleware, reservationController.updateStatus);

export default router;