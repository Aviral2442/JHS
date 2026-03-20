import express from "express";
import { sendSMSController } from "../controller/mailerController";

const router = express.Router();

// MSG91 API Integration and nodemailer for sending OTP via email or SMS based on the input type (email or mobile number)
router.post("/send-sms", sendSMSController);

export default router;