import { Reservation, ReservationStatus } from '../../domain/entities/reservation';
import { IReservationRepository } from '../../domain/repositories/IReservationRepository';

export class UpdateReservationStatusUseCase {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(id: string, status: ReservationStatus): Promise<Reservation> {
    // يمكننا إضافة لوجيك هنا مثلا: لا يمكن تحويل حجز "ملغى" إلى "مؤكد"
    return this.reservationRepository.updateStatus(id, status);
  }
}