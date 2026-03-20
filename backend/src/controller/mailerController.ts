import { emailTemplate } from "../utils/emailTemplate";
import { sendMailService, sendSMSService } from "../services/mailerService";
import { Request, Response, NextFunction } from "express";

export const sendMailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { to, subject, headerTitle, bodyContent, footerContent, buttonText, buttonLink } =
            req.body;
        const result = await sendMailService({
            to,
            subject,
            headerTitle,
            bodyContent,
            footerContent,
            buttonText,
            buttonLink,
        });
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        next(error);
    }
};

export const sendSMSController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const mobile = req.body.mobile;
        const result = await sendSMSService(mobile);
        return res.status(result.status).json(result);

    } catch (error) {
        next(error);
    }
};