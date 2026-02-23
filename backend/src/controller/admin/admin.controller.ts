import { Request, Response, NextFunction } from "express";
import { addRemarkService } from "../../services/admin/admin.service";

// ADD REMARK CONTROLLER
export const addRemarkController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const remarkData = req.body;
        const result = await addRemarkService(remarkData);
        res.status(result.status).json(result);
    } catch (error){
        next(error);
    }
};