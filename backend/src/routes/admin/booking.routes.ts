import { Router } from "express";
import { addBookingDetailsController, fetchBookingDetailsController, getBookingListController, updateBookingAddressController, updateBookingCategoryController, updateBookingConsumerController, updateBookingScheduleController, updateBookingVendorController } from "../../controller/admin/booking.controller";


const router = Router();

router.get("/get_booking_list", getBookingListController);
router.get("/fetch_booking_details/:bookingId", fetchBookingDetailsController);
router.post("/add_booking_details", addBookingDetailsController);
router.put("/update_booking_address/:bookingId", updateBookingAddressController);
router.put("/update_booking_category/:bookingId", updateBookingCategoryController);
router.patch("/update_booking_consumer/:bookingId", updateBookingConsumerController);
router.patch("/update_booking_schedule/:bookingId", updateBookingScheduleController);
router.patch("/update_booking_vendor/:bookingId", updateBookingVendorController);


export default router;