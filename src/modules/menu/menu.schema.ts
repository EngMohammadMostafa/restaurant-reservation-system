import { z } from 'zod';

export const createMenuSchema = z.object({
  dishName: z.string().trim().min(2, { message: 'Dish name must be at least 2 characters long' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
});

export const updatePriceSchema = z.object({
  price: z.number().positive({ message: 'Price must be a positive number' }),
});

export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdatePriceInput = z.infer<typeof updatePriceSchema>;