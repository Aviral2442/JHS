import { Request, Response, NextFunction } from "express";
import { addBookingDetailsService, fetchBookingDetailsService, getBookingListService, updateBookingDetailsService } from "../../services/admin/booking.service";


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

// UPDATE BOOKING DETAILS CONTROLLER
export const updateBookingDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        const bookingData = req.body;
        const result = await updateBookingDetailsService(bookingId, bookingData);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};