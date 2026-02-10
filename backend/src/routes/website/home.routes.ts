import { Router } from "express";
import { ContactUsController } from "../../controller/website/home.controller";
const router = Router();

router.post('/add_contact_us', ContactUsController);

export default router;