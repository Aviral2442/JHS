import { Router } from "express";
import { UserLoginController, UserRegistrationController } from "../../controller/website/auth.controller";

const router = Router();

router.post('/user-registration', UserRegistrationController);
router.post('/user-login', UserLoginController);

export default router;