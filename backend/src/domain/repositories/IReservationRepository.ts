import { Reservation } from '../entities/reservation';

export interface IReservationRepository {
  findAll(): Promise<Reservation[]>;
  findById(id: string): Promise<Reservation | null>;
  create(reservation: Reservation): Promise<Reservation>;
  updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Reservation>;
}