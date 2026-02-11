import { NextFunction, Request, Response } from "express";
import { adminLoginService, adminRegisterService } from "../../services/admin/auth.service";

// ADMIN REGISTRATION CONTROLLER
export const adminRegisterController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await adminRegisterService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADMIN LOGIN CONTROLLER
export const adminLoginController = async (req: Request, res: Response, next: NextFunction) =>{
    try {
            const { admin_email, admin_password } = req.body;
            const result = await adminLoginService(admin_email, admin_password);
            res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
};