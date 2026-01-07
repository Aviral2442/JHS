import { Router } from 'express';
import { createCategoryLavel3Controller } from '../controller/productController';
import { asyncHandler } from '../utils/asyncHandler';
import { uploadFile } from '../utils/fileUpload';

const router = Router();

router.post(
    '/create-category-lavel3',
    uploadFile('category_level3', 'cl3_image'),
    asyncHandler(createCategoryLavel3Controller)
);

export default router;
