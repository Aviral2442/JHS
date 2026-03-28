import { Router } from "express";
import { consumerLoginController, fetchConsumerDetailsController, getConsumerListController, searchConsumerController, signUpConsumerController, updateConsumerDetailsController, updateConsumerStatusController } from "../../controller/admin/consumer.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
const router = Router();

router.use(authMiddleware);

router.get("/get_consumers_list", getConsumerListController);
router.post("/consumer_signup", signUpConsumerController);
router.get("/fetch_consumer_details/:consumerId", fetchConsumerDetailsController);
router.put("/update_consumer_details/:consumerId", updateConsumerDetailsController);
router.patch("/update_consumer_status/:consumerId", updateConsumerStatusController);
router.post("/consumer_login", consumerLoginController);

router.get("/search_consumer", searchConsumerController);

export default router;