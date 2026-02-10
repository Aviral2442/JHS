import { NextFunction, Request, Response } from 'express';
import { contactUsService } from '../../services/website/home.service';

// ADD CONTACT US CONTROLLER
export const ContactUsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data =  req.body;
        const result = await contactUsService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};