import { Router } from "express";
import { addVendorDetailsController, fetchVendorDetailsController, getVendorListController, updateVendorBlockStatusController, updateVendorDetailsController, updateVendorVerifyStatusController } from "../../controller/admin/vendor.controller";
const router = Router();

router.get("/get_vendor_list", getVendorListController);
router.get("/fetch_vendor_details/:vendorId", fetchVendorDetailsController);
router.post("/add_vendor_details", addVendorDetailsController);
router.put("/update_vendor_details/:vendorId", updateVendorDetailsController);
router.patch("/update_vendor_verify_status/:vendorId", updateVendorVerifyStatusController);
router.patch("/update_vendor_block_status/:vendorId", updateVendorBlockStatusController);

export default router;