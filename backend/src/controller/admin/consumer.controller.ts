import { NextFunction, Request, Response } from "express";
import { addConsumerService, consumerLoginService, fetchConsumerDetailsService, getConsumerListService, updateConsumerDetailsService, updateConsumerStatusService } from "../../services/admin/consumer.service";


// GET CONSUMER LIST CONTROLLER
export const getConsumerListController = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await getConsumerListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// SIGN UP CONSUMER CONTROLLER
export const signUpConsumerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await addConsumerService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH CONSUMER DETAILS CONTROLLER
export const fetchConsumerDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consumerId = req.params.consumerId;
        const result = await fetchConsumerDetailsService(consumerId);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE CONSUMER DETAILS CONTROLLER
export const updateConsumerDetailsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consumerId = req.params.consumerId;
        const data = req.body;
        const result = await updateConsumerDetailsService(consumerId, data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE CONSUMER STATUS CONTROLLER
export const updateConsumerStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consumerId = req.params.consumerId;
        const status = req.body.status;
        const result = await updateConsumerStatusService(consumerId, status);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// CONSUMER LOGIN CONTROLLER
export const consumerLoginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await consumerLoginService(email, password);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};