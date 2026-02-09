import express from "express";
import { sendMailController } from "../controller/mailerController";

const router = express.Router();

router.post("/send-mail", sendMailController);

export default router;