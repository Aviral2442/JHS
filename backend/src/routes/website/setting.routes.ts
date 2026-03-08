import { Router } from "express";
import { fetchWebsiteDataController, updateWebsiteDataController } from "../../controller/website/setting.controller";

const router = Router();

router.get("/get_website_data", fetchWebsiteDataController);
router.put("/update_website_data", updateWebsiteDataController);


export default router;