import { Router } from "express";
import { adminRegister } from "../controller/authController";

const router = Router();

router.post("/admin/register", adminRegister);

export default router;