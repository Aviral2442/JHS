import { Request, Response, NextFunction } from 'express';
import { addRoleService, fetchRoleDetailsService, getRoleListService, updateRoleService, updateRoleStatusService } from '../../services/admin/roleBasedAccessControl.service';


//----------------------------------------------ROLE CONTROLLER----------------------------------------------//

// ROLE LIST CONTROLLER
export const getRoleListController = async (req: Request, res: Response, next: NextFunction) => {
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
        const result = await getRoleListService(filters);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD ROLE CONTROLLER
export const addRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await addRoleService(data);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH ROLE DETAIL CONTROLLER
export const getRoleDetailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role_id = parseInt(req.params.role_id);

        if (!role_id) {
            return res.status(400).json({
                status: 400,
                message: "Role ID is required and must be a valid integer.",
            });
        }
        const result = await fetchRoleDetailsService(role_id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE ROLE CONTROLLER
export const updateRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role_id = parseInt(req.params.role_id);
        const data = req.body;

        if (!role_id) {
            return res.status(400).json({
                status: 400,
                message: "Role ID is required and must be a valid integer.",
            });
        }

        const result = await updateRoleService(data, role_id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE ROLE STATUS CONTROLLER
export const updateRoleStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role_id = parseInt(req.params.role_id);
        const { status } = req.body.role_status;

        if (!role_id || status === undefined) {
            return res.status(400).json({
                status: 400,
                message: "Role ID OR Status is required and must be a valid integer.",
            });
        }
        const result = await updateRoleStatusService(status, role_id);
        res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};
