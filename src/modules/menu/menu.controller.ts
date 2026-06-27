import { Request, Response, NextFunction } from 'express';
import { MenuService } from './menu.service';
import { AppError } from '../../shared/utils/app-error';

const menuService = new MenuService();

export const getMenu = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const menu = await menuService.getMenuList();
    res.status(200).json({ status: 'success', data: menu });
  } catch (error) {
    next(error);
  }
};

export const createDish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newDish = await menuService.addDish(req.body);
    res.status(201).json({ status: 'success', data: newDish });
  } catch (error) {
    next(error);
  }
};

export const updatePrice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (!id) {
      throw new AppError('Dish ID is required', 400);
    }

    const dishId = id as string; // حسم نوع الـ id للـ Strict mode
    const updatedDish = await menuService.updateDishPrice(dishId, price);

    res.status(200).json({ status: 'success', data: updatedDish });
  } catch (error) {
    next(error);
  }
};