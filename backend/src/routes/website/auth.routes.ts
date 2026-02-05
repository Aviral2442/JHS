const express = require('express');
import { UserLoginController, UserRegistrationController } from "../../controller/website/auth.controller";
const router = express.Router();

router.post('/user-registration', UserRegistrationController);
router.post('/user-login', UserLoginController);

module.exports = router;