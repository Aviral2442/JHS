import { Request, Response, NextFunction } from "express";
import { addBookingDetailsService, fetchBookingDetailsService, getBookingListService, updateBookingAddressService, updateBookingCategoryService, updateBookingConsumerService, updateBookingScheduleService, updateBookingVendorService } from "../../services/admin/booking.service";


// GET BOOKING LIST CONTROLLER
export const getBookingListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = {
            date: req.query.date as string,
            status: req.query.status as string,
            fromDate: req.query.fromDate as string,
            toDate: req.query.toDate as string,
            page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
            search: req.query.search as string,
        };
        const result = await getBookingListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH BOOKING DETAILS CONTROLLER
export const fetchBookingDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const result = await fetchBookingDetailsService(bookingId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD BOOKING DETAILS CONTROLLER
export const addBookingDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingData = req.body;
        const result = await addBookingDetailsService(bookingData);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE BOOKING ADDRESS CONTROLLER
export const updateBookingAddressController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const bookingData = req.body;
        const result = await updateBookingAddressService(bookingId, bookingData);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE BOOKING VENDOR CONTROLLER
export const updateBookingVendorController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const vendorId = req.body.vendorId;
        const result = await updateBookingVendorService(bookingId, vendorId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE BOOKING SCHEDULE CONTROLLER
export const updateBookingScheduleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const scheduleData = req.body;
        const result = await updateBookingScheduleService(bookingId, scheduleData);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE BOOKING CATEGORY CONTROLLER
export const updateBookingCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const categoryData = req.body;
        const result = await updateBookingCategoryService(bookingId, categoryData);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE BOOKING CONSUMER CONTROLLER
export const updateBookingConsumerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const consumerId = req.body.consumerId;
        const result = await updateBookingConsumerService(bookingId, consumerId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};