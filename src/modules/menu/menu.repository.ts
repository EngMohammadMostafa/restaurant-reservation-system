import { prisma } from '../../shared/config/database';
import { CreateMenuInput } from './menu.schema';

export class MenuRepository {
  // 1. جلب كل الأطباق
  public async findAll() {
    return await prisma.menu.findMany({
      orderBy: { dishName: 'asc' }, // ترتيب أبجدي للأطباق
    });
  }

  // 2. جلب طبق معين بواسطة الـ ID
  public async findById(id: string) {
    return await prisma.menu.findUnique({
      where: { id },
    });
  }

  // 3. إضافة طبق جديد (للأدمن)
  public async create(data: CreateMenuInput) {
    return await prisma.menu.create({
      data: {
        dishName: data.dishName,
        price: data.price,
      },
    });
  }

  // 4. تحديث سعر الطبق (للأدمن)
  public async updatePrice(id: string, price: number) {
    return await prisma.menu.update({
      where: { id },
      data: { price },
    });
  }
}