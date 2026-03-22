import { NextFunction, Request, Response } from 'express';
import { addProductService, fetchProductDetailsService, getProductListService, updateProductService, updateProductStatusService } from '../../services/website/product.service';

// GET PRODUCT LIST CONTROLLER
export const getProductListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: any = req.body && Object.keys(req.body).length ? req.body : req.query;

        const filters = {
            date: payload.date as string,
            status: payload.status as string,
            fromDate: payload.fromDate as string,
            toDate: payload.toDate as string,
            page: payload.page ? parseInt(payload.page as string, 10) : undefined,
            limit: payload.limit ? parseInt(payload.limit as string, 10) : undefined,
            search: payload.search as string,
        }

        const categoryRaw = payload.category ?? payload.category_id ?? payload.service_ctg_level_1;
        const categoryId = Number.parseInt(String(categoryRaw), 10);

        if (!Number.isInteger(categoryId) || categoryId <= 0) {
            return res.status(400).json({
                status: 400,
                message: "Valid category id is required.",
                jsonData: {},
            });
        }

        const result = await getProductListService(filters, categoryId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD PRODUCT CONTROLLER
export const addProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        // console.log("Received data in controller:", data); // Debug log to check incoming data
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