import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/AsyncHandler';
import { createCategoryLavel3Service } from '../../services/website/product.service';
export const createCategoryLavel3Controller = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await createCategoryLavel3Service({ ...req.body });
        res.status(200).json({
            message: 'Category Level 3 created successfully',
            data: result,
        });
    }
);