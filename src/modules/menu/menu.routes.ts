import { Router } from 'express';
import { getMenu, createDish, updatePrice } from './menu.controller';
import { protectAdmin } from '../../shared/middlewares/auth.middleware';
import { validateBody } from '../../shared/middlewares/validation.middleware';
import { createMenuSchema, updatePriceSchema } from './menu.schema';

const router = Router();

// مسار عام: يمكن لأي زبون تصفح المنيو ورؤية الأسعار
router.get('/', getMenu);

// مسارات محمية: للأدمن فقط لإنشاء طبق أو تعديل سعره
router.post('/', protectAdmin, validateBody(createMenuSchema), createDish);
router.put('/:id', protectAdmin, validateBody(updatePriceSchema), updatePrice);

export default router;