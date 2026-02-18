import { Router } from "express";
import { ContactUsController, getCityListSearchController, getStateListController } from "../../controller/website/home.controller";
const router = Router();

router.post('/add_contact_us', ContactUsController);

router.get('/get_state_list', getStateListController);
router.get('/get_city_list_search', getCityListSearchController);


export default router;