import { Router } from "express";
import { addBookingDetailsController, fetchBookingDetailsController, getBookingListController, updateBookingDetailsController } from "../../controller/admin/booking.controller";


const router = Router();

router.get("/get_booking_list", getBookingListController);
router.get("/fetch_booking_details/:bookingId", fetchBookingDetailsController);
router.post("/add_booking_details", addBookingDetailsController);
router.put("/update_booking_details/:bookingId", updateBookingDetailsController);

export default router;