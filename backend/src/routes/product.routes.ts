import { Router } from 'express';
import { createCategoryLavel3Controller } from '../controller/product.controller';

const router = Router();

router.post('/create-category-lavel3', createCategoryLavel3Controller);

export default router;
