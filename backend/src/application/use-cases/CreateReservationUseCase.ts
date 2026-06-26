import { Reservation } from '../../domain/entities/reservation';
import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import { IEmailService } from '../services/IEmailService';

export class CreateReservationUseCase {
  constructor(
    private reservationRepository: IReservationRepository,
    private emailService: IEmailService
  ) {}

  async execute(data: Omit<Reservation, 'id' | 'status' | 'createdAt'>, customerEmail: string): Promise<Reservation> {
    // 1. تجهيز الكيان الجديد بحالة "قيد الانتظار"
    const newReservation: Reservation = {
      ...data,
      status: 'pending',
    };

    // 2. حفظ الحجز في قاعدة البيانات
    const createdReservation = await this.reservationRepository.create(newReservation);

    // 3. تجهيز رابط الإلغاء (سنفترض أن النطاق موجود في متغيرات البيئة لاحقاً)
    const cancelLink = `http://localhost:3000/reservations/cancel/${createdReservation.id}`;

    // 4. إرسال الإيميل (التطبيق لا يهتم كيف سيُرسل، فقط يطلب إرساله)
    await this.emailService.sendReservationConfirmation(customerEmail, createdReservation, cancelLink);

    return createdReservation;
  }
}