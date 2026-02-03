import { NextFunction, Request, Response } from "express";
import { adminRegisterService } from "../services/auth.service";

// ADMIN REGISTRATION CONTROLLER
export const adminRegisterController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await adminRegisterService(data);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};