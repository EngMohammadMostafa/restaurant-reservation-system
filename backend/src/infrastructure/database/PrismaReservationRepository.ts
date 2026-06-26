import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import { Reservation } from '../../domain/entities/reservation';
import { prisma } from './prisma';

export class PrismaReservationRepository implements IReservationRepository {
  
  async findAll(): Promise<Reservation[]> {
    const records = await prisma.reservation.findMany();
    // نقوم بعمل مابينج للبيانات لتتوافق مع الـ Entity الخاص بالـ Domain
    return records.map(record => ({
      id: record.id,
      name: record.name,
      date: record.date,
      time: record.time,
      numberOfGuests: record.numberOfGuests,
      status: record.status as any,
      createdAt: record.createdAt
    }));
  }

  async findById(id: string): Promise<Reservation | null> {
    const record = await prisma.reservation.findUnique({ where: { id } });
    if (!record) return null;
    
    return {
      id: record.id,
      name: record.name,
      date: record.date,
      time: record.time,
      numberOfGuests: record.numberOfGuests,
      status: record.status as any,
      createdAt: record.createdAt
    };
  }

  async create(reservation: Reservation): Promise<Reservation> {
    const record = await prisma.reservation.create({
      data: {
        name: reservation.name,
        date: reservation.date,
        time: reservation.time,
        numberOfGuests: reservation.numberOfGuests,
        status: reservation.status
      }
    });

    return {
      id: record.id,
      name: record.name,
      date: record.date,
      time: record.time,
      numberOfGuests: record.numberOfGuests,
      status: record.status as any,
      createdAt: record.createdAt
    };
  }

  async updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Reservation> {
    const record = await prisma.reservation.update({
      where: { id },
      data: { status }
    });

    return {
      id: record.id,
      name: record.name,
      date: record.date,
      time: record.time,
      numberOfGuests: record.numberOfGuests,
      status: record.status as any,
      createdAt: record.createdAt
    };
  }
}