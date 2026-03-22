import { Request, Response, NextFunction } from "express";
import { addRemarkService, getContactUsListService } from "../../services/admin/admin.service";

// ADD REMARK CONTROLLER
export const addRemarkController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const remarkData = req.body;
        const result = await addRemarkService(remarkData);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// GET CONTACT US LIST CONTROLLER
export const getContactUsListController = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await getContactUsListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};