import { NextFunction, Request, Response } from "express";
import { addVendorDetailsService, fetchVendorDetailsService, getVendorListService, searchVendorService, updateVendorDetailsService, vendorBlockStatusService, vendorVerifyStatusService } from "../../services/admin/vendor.service";


// GET VENDOR LIST CONTROLLER
export const getVendorListController = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await getVendorListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH VENDOR DETAILS CONTROLLER
export const fetchVendorDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorId = req.params.vendorId;
        const result = await fetchVendorDetailsService(vendorId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD VENDOR DETAIL CONTROLLER
export const addVendorDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorData = req.body;
        const result = await addVendorDetailsService(vendorData);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE VENDOR DETAIL CONTROLLER
export const updateVendorDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorId = parseInt(req.params.vendorId);
        const vendorData = req.body;
        const result = await updateVendorDetailsService(vendorId, vendorData);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// VENDOR VERIFY STATUS CONTROLLER
export const updateVendorVerifyStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorId = parseInt(req.params.vendorId);
        const result = await vendorVerifyStatusService(vendorId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// VENDOR BLOCK STATUS CONTROLLER
export const updateVendorBlockStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorId = parseInt(req.params.vendorId);
        const result = await vendorBlockStatusService(vendorId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

export const searchVendorController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchTerm = req.params.search;
        const result = await searchVendorService(searchTerm);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};