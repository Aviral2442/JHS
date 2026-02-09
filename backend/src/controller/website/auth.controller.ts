import { NextFunction, Request, Response, } from 'express';
import { UserLoginService, UserRegisterService } from '../../services/website/auth.service';

// CONSUMER REGISTRATION CONTROLLER
export const UserRegistrationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserRegisterService({ ...req.body });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// CONSUMER LOGIN CONTROLLER
export const UserLoginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserLoginService({ ...req.body });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};