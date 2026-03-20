import express from "express";
import { sendMailController, sendSMSController } from "../controller/mailerController";

const router = express.Router();

router.post("/send-mail", sendMailController);
router.post("/send-sms", sendSMSController);

export default router;