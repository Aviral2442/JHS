import { Request, Response, NextFunction } from "express";
import { fetchWebsiteDataService, updateWebsiteDataService } from "../../services/website/setting.service";

export const fetchWebsiteDataController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await fetchWebsiteDataService();
        res.status(result.status).json(result);
    } catch (error) {
        next(error)
    }
};

export const updateWebsiteDataController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        // console.log(data)
        const result = await updateWebsiteDataService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error)
    }
};