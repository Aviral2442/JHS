import { NextFunction, Request, Response } from 'express';
import { createCategoryLavel3Service } from '../../services/website/product.service';

// CREATE CATEGORY LEVEL 3 CONTROLLER
export const createCategoryLavel3Controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await createCategoryLavel3Service({ ...req.body });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
