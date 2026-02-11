import { NextFunction, Request, Response } from "express";
import { addCategoryLevelOneService, addCategoryLevelThreeService, addCategoryLevelTwoService, getCategoryLevelOneDetailsService, getCategoryLevelOneListService, getCategoryLevelThreeDetailsService, getCategoryLevelThreeListService, getCategoryLevelTwoDetailsService, getCategoryLevelTwoListService, updateCategoryLevelOneService, updateCategoryLevelOneStatusService, updateCategoryLevelThreeService, updateCategoryLevelThreeStatusService, updateCategoryLevelTwoService, updateCategoryLevelTwoStatusService } from "../../services/admin/category.service";


//---------------------------------- CATEGORY LEVEL ONE CONTROLLERS -----------------------------

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





//---------------------------------- CATEGORY LEVEL TWO CONTROLLERS -----------------------------

// GET CATEGORY LEVEL TWO LIST CONTROLLER
export const getCategoryLevelTwoListController = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await getCategoryLevelTwoListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD CATEGORY LEVEL TWO CONTROLLER
export const addCategoryLevelTwoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await addCategoryLevelTwoService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH CATEGORY LEVEL TWO DETAILS CONTROLLER
export const getCategoryLevelTwoDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level2_id = parseInt(req.params.catLvl2Id);
        const result = await getCategoryLevelTwoDetailsService(category_level2_id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE CATEGORY LEVEL TWO CONTROLLER
export const updateCategoryLevelTwoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level2_id = parseInt(req.params.catLvl2Id);
        const data = req.body;
        const result = await updateCategoryLevelTwoService(category_level2_id, data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE CATEGORY LEVEL TWO STATUS CONTROLLER
export const updateCategoryLevelTwoStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level2_id = parseInt(req.params.catLvl2Id);
        const result = await updateCategoryLevelTwoStatusService(category_level2_id, req.body.category_level2_status);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};




//---------------------------------- CATEGORY LEVEL THREE CONTROLLERS -----------------------------

// GET CATEGORY LEVEL THREE LIST CONTROLLER
export const getCategoryLevelThreeListController = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await getCategoryLevelThreeListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD CATEGORY LEVEL THREE CONTROLLER
export const addCategoryLevelThreeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await addCategoryLevelThreeService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH CATEGORY LEVEL THREE DETAILS CONTROLLER
export const getCategoryLevelThreeDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level3_id = parseInt(req.params.catLvl3Id);
        const result = await getCategoryLevelThreeDetailsService(category_level3_id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE CATEGORY LEVEL THREE CONTROLLER
export const updateCategoryLevelThreeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level3_id = parseInt(req.params.catLvl3Id);
        const data = req.body;
        const result = await updateCategoryLevelThreeService(category_level3_id, data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE CATEGORY LEVEL THREE STATUS CONTROLLER
export const updateCategoryLevelThreeStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category_level3_id = parseInt(req.params.catLvl3Id);
        const result = await updateCategoryLevelThreeStatusService(category_level3_id, req.body.category_level3_status);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};