import { NextFunction, Request, Response } from 'express';
import { addProductService, fetchProductDetailsService, getProductListService, updateProductService, updateProductStatusService } from '../../services/website/product.service';

// GET PRODUCT LIST CONTROLLER
export const getProductListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = {
            date: req.query.date as string,
            status: req.query.status as string,
            fromDate: req.query.fromDate as string,
            toDate: req.query.toDate as string,
            page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
            search: req.query.search as string,
        }

        const result = await getProductListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD PRODUCT CONTROLLER
export const addProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        console.log("Received data in controller:", data); // Debug log to check incoming data
        const result = await addProductService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH PRODUCT DETAIL CONTROLLER
export const getProductDetailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service_id = parseInt(req.params.service_id);
        const result = await fetchProductDetailsService(service_id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE PRODUCT CONTROLLER
export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service_id = parseInt(req.params.service_id);
        const data = req.body;
        const result = await updateProductService(data, service_id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE PRODUCT STATUS CONTROLLER
export const updateProductStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const service_id = parseInt(req.params.service_id);
        const { status } = req.body.service_status;
        const result = await updateProductStatusService(service_id, status);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};