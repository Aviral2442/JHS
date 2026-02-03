import { Router } from "express";
import { adminRegisterController } from "../controller/auth.controller";

const router = Router();

router.post("/admin/register", adminRegisterController);

export default router;