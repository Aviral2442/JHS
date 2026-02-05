import { Router } from "express";
import { adminLoginController, adminRegisterController } from "../../controller/admin/auth.controller";

const router = Router();

router.post("/admin/register", adminRegisterController);
router.post("/admin/login", adminLoginController);

export default router;