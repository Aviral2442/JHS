import { Router } from "express";
import { addRemarkController, getContactUsListController } from "../../controller/admin/admin.controller";
import { authMiddleware } from "../../middleware/authMiddleware";


const router = Router();

// router.use(authMiddleware);

router.post("/add_remark", addRemarkController);
router.get("/get_contact_us_list", getContactUsListController);


export default router;