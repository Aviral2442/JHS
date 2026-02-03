import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import dbConfig from "../config/db_Config";
import { asyncHandler } from "../utils/AsyncHandler";
import { adminRegisterService } from "../services/auth.service";
import { profile } from "node:console";

// ADMIN REGISTRATION CONTROLLER
export const adminRegisterController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        console.log("Admin Registration Data:", data);
        const result = await adminRegisterService(data);
        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};