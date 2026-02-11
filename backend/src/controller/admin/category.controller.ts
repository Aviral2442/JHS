import { NextFunction, Request, Response } from "express";
import { addCategoryLevelOneService, getCategoryLevelOneDetailsService, getCategoryLevelOneListService, updateCategoryLevelOneService, updateCategoryLevelOneStatusService } from "../../services/admin/category.service";

// GET CATEGORY LEVEL ONE LIST CONTROLLER
export const getCategoryLevelOneListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = {
            date: req.query.date as string,
            status: req.query.status as string,
            fromDate: req.query.fromDate as string,
            toDate: req.query.toDate as string,
            page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
            search: req.query.search as string,
        };
        const result = await getCategoryLevelOneListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD CATEGORY LEVEL ONE CONTROLLER
export const addCategoryLevelOneController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await addCategoryLevelOneService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH CATEGORY LEVEL ONE DETAILS CONTROLLER
export const getCategoryLevelOneDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level1_id = parseInt(req.params.catLvl1Id);
        const result = await getCategoryLevelOneDetailsService(category_level1_id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE CATEGORY LEVEL ONE CONTROLLER
export const updateCategoryLevelOneController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level1_id = parseInt(req.params.catLvl1Id);
        const data = req.body;
        const result = await updateCategoryLevelOneService(category_level1_id, data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE CATEGORY LEVEL ONE STATUS CONTROLLER
export const updateCategoryLevelOneStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level1_id = parseInt(req.params.catLvl1Id);
        const result = await updateCategoryLevelOneStatusService(category_level1_id, req.body.category_level1_status);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};