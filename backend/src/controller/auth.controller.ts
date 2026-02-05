import { NextFunction, Request, Response } from "express";
import { adminLoginService, adminRegisterService } from "../services/auth.service";
import { asyncHandler } from "../utils/AsyncHandler";

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

// ADMIN LOGIN CONTROLLER
export const adminLoginController = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { admin_email, admin_password } = req.body;
            console.log("Login request received with email:", admin_email, "and password:", admin_password);
            const result = await adminLoginService(admin_email, admin_password);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
)