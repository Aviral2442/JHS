import { NextFunction, Request, Response } from 'express';
import { contactUsService, getCityListService, getStateListService } from '../../services/website/home.service';

// ADD CONTACT US CONTROLLER
export const ContactUsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await contactUsService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// GET STATE LIST CONTROLLER
export const getStateListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getStateListService();
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// GET CITY LIST SEARCH CONTROLLER
export const getCityListSearchController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const search = req.query.search as string;
        if (!search || search.trim() === "") {
            return res.status(400).json({ status: 400, message: "Search term is required" });
        }
        const result = await getCityListService(search);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};