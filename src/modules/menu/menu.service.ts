import { MenuRepository } from './menu.repository';
import { CreateMenuInput } from './menu.schema';
import { AppError } from '../../shared/utils/app-error';

export class MenuService {
  private menuRepository = new MenuRepository();

  public async getMenuList() {
    return await this.menuRepository.findAll();
  }

  public async addDish(input: CreateMenuInput) {
    return await this.menuRepository.create(input);
  }

  public async updateDishPrice(id: string, price: number) {
    const existing = await this.menuRepository.findById(id);
    if (!existing) {
      throw new AppError('Dish not found in the menu', 404);
    }
    return await this.menuRepository.updatePrice(id, price);
  }
}