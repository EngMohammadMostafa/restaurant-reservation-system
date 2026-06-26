import { Reservation } from '../../domain/entities/reservation';
import { IReservationRepository } from '../../domain/repositories/IReservationRepository';

export class GetReservationsUseCase {
  // نقوم بحقن الـ Repository هنا
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(): Promise<Reservation[]> {
    return this.reservationRepository.findAll();
  }
}