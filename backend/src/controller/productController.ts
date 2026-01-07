import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { createCategoryLavel3Service } from '../services/productServices';
import { processFiles } from '../utils/fileUpload';

export const createCategoryLavel3Controller = asyncHandler(
    async (req: Request, res: Response) => {
        const { cl3_name, cl3_status } = req.body;
        let cl3_image = '';

        // if file exists, process it using our utils
        if (req.file) {
            cl3_image = await processFiles('category_level3', req.file); // folder: category_level3
        }

        const result = await createCategoryLavel3Service({
            cl3_name,
            cl3_image,
            cl3_status,
        });

        res.status(201).json({
            message: 'Category Level 3 created successfully',
            data: result,
        });
    }
);
