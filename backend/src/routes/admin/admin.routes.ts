import { Router } from "express";
import { addRemarkController } from "../../controller/admin/admin.controller";


const router = Router();

router.post("/add_remark", addRemarkController)


export default router;