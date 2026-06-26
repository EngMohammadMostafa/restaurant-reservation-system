import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import { Reservation } from '../../domain/entities/reservation';

export class InMemoryReservationRepository implements IReservationRepository {
  // المصفوفة التي ستحتفظ بالبيانات في الذاكرة
  private reservations: Reservation[] = [];

  async findAll(): Promise<Reservation[]> {
    return this.reservations;
  }

  async findById(id: string): Promise<Reservation | null> {
    const reservation = this.reservations.find(r => r.id === id);
    return reservation || null;
  }

  async create(reservation: Reservation): Promise<Reservation> {
    const newReservation: Reservation = {
      ...reservation,
      id: Math.random().toString(36).substring(2, 11), // توليد ID عشوائي
      createdAt: new Date()
    };
    this.reservations.push(newReservation);
    return newReservation;
  }

  async updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Reservation> {
    const index = this.reservations.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Reservation not found');
    }

    this.reservations[index].status = status;
    return this.reservations[index];
  }
}