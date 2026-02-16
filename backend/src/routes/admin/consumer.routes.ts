import { Router } from "express";
import { consumerLoginController, fetchConsumerDetailsController, getConsumerListController, signUpConsumerController, updateConsumerDetailsController, updateConsumerStatusController } from "../../controller/admin/consumer.controller";
const router = Router();


router.get("/get_consumers_list", getConsumerListController);
router.post("/consumer_signup", signUpConsumerController);
router.get("/fetch_consumer_details/:consumerId", fetchConsumerDetailsController);
router.put("/update_consumer_details/:consumerId", updateConsumerDetailsController);
router.patch("/update_consumer_status/:consumerId", updateConsumerStatusController);
router.post("/consumer_login", consumerLoginController);


export default router;