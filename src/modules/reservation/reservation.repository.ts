import { prisma } from '../../shared/config/database';
import { CreateReservationInput } from './reservation.schema';

export class ReservationRepository {
  // 1. جلب كل الحجوزات من قاعدة البيانات
  public async findAll() {
    return await prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' }, // ترتيب من الأحدث للأقدم
    });
  }

  // 2. جلب حجز معين بواسطة الـ ID
  public async findById(id: string) {
    return await prisma.reservation.findUnique({
      where: { id },
    });
  }

  // [جديد] 3. التحقق من وجود حجز مسبق بنفس التاريخ والوقت (معلق أو مؤكد)
  public async findByDateTime(date: string, time: string) {
    return await prisma.reservation.findFirst({
      where: {
        date: date,
        time: time,
        status: {
          in: ['pending', 'confirmed']
        }
      }
    });
  }

  // 4. إنشاء حجز جديد في قاعدة البيانات
  public async create(data: CreateReservationInput) {
    return await prisma.reservation.create({
      data: {
        name: data.name,
        email: data.email, // <--- تمرير الإيميل لقاعدة البيانات
        date: data.date,
        time: data.time,
        guests: data.guests,
        status: 'pending',
      },
    });
  }

  // 5. تحديث حالة الحجز (pending / confirmed / cancelled)
  public async updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
    return await prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}