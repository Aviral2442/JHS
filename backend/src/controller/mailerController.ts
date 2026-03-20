import { emailTemplate } from "../utils/emailTemplate";
import { sendSMSService } from "../services/mailerService";
import { Request, Response, NextFunction } from "express";

// MSG91 API Integration and nodemailer for sending OTP via email or SMS based on the input type (email or mobile number)
export const sendSMSController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const emailOrMobile = req.body.emailOrMobile;
        const result = await sendSMSService(emailOrMobile);
        return res.status(result.status).json(result);

    } catch (error) {
        next(error);
    }
};