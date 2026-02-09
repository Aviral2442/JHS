import { Request, Response } from 'express';
import { UserLoginService, UserRegisterService } from '../../services/website/auth.service';


export const UserRegistrationController = async (req: Request, res: Response) => {
    const result = await UserRegisterService({ ...req.body });
    res.status(200).json({
        message: 'User registered successfully',
        data: result,
    });
};

// CONSUMER LOGIN CONTROLLER can be added similarly
export const UserLoginController = async (req: Request, res: Response) => {
    const result = await UserLoginService({ ...req.body });
    res.status(200).json({
        message: 'User logged in successfully',
        data: result,
    });
};