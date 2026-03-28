import { Router } from "express";
import { addVendorDetailsController, fetchVendorDetailsController, getVendorListController, searchVendorController, updateVendorBlockStatusController, updateVendorDetailsController, updateVendorVerifyStatusController } from "../../controller/admin/vendor.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
const router = Router();

router.use(authMiddleware);

router.get("/get_vendor_list", getVendorListController);
router.get("/fetch_vendor_details/:vendorId", fetchVendorDetailsController);
router.post("/add_vendor_details", addVendorDetailsController);
router.put("/update_vendor_details/:vendorId", updateVendorDetailsController);
router.patch("/update_vendor_verify_status/:vendorId", updateVendorVerifyStatusController);
router.patch("/update_vendor_block_status/:vendorId", updateVendorBlockStatusController);

router.get("/search_vendor", searchVendorController);

export default router;