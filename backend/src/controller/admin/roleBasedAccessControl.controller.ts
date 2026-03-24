import { Request, Response } from 'express';
import { addAdminUserService, addModuleService, addOperationService, addRoleService, fetchAllModuleAndOperationsService, fetchDataForSideBarService, getAdminDetailsService, getAdminListService, getModuleDetailsService, getModulesListService, getOperationDetailsService, getOperationsListService, getRoleDetailsService, roleListService, updateAdminService, updateAdminStatusService, updateModuleService, updateModuleStatusService, updateOperationService, updatePermissionsService, updateRoleService, updateRoleStatusService } from '../../services/admin/roleBasedAccessControl.service';

// ROLE LIST CONTROLLER
export const roleListController = async (req: Request, res: Response, next: Function) => {
    try {
        const result = await roleListService();
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD ROLE CONTROLLER
export const addRoleController = async (req: Request, res: Response, next: Function) => {
    try {
        // console.log("Request Body:", req.body); // Debug log to check incoming data
        const result = await addRoleService(req.body);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// GET ROLE DETAILS CONTROLLER
export const getRoleDetailsController = async (req: Request, res: Response, next: Function) => {
    try {
        const roleId = parseInt(req.params.role_id);
        const result = await getRoleDetailsService(roleId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE ROLE CONTROLLER
export const updateRoleController = async (req: Request, res: Response, next: Function) => {
    try {
        // console.log("Request Body for Update:", req.body, req.params.role_id); // Debug log to check incoming data for update
        const result = await updateRoleService(req.body, parseInt(req.params.role_id));
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE ROLE STATUS CONTROLLER
export const updateRoleStatusController = async (req: Request, res: Response, next: Function) => {
    try {
        const roleId = parseInt(req.params.role_id);
        const result = await updateRoleStatusService(roleId, req.body.status);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// GET ADMINS LIST CONTROLLER
export const getAdminsListController = async (req: Request, res: Response, next: Function) => {
    try {

        const filters = {
            date: req.query.date as string,
            status: req.query.status as string,
            fromDate: req.query.fromDate as string,
            toDate: req.query.toDate as string,
            page: req.query.page ? parseInt(req.query.page as string) : 1,
            limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
            search: req.query.search as string,
        }

        const result = await getAdminListService(filters);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD ADMIN USER CONTROLLER
export const addAdminController = async (req: Request, res: Response, next: Function) => {
    try {
        const data = req.body;
        console.log("Request Body for Add Admin:", data); // Debug log to check incoming data for add admin
        const result = await addAdminUserService(data);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// GET ADMIN DETAILS CONTROLLER
export const getAdminDetailsController = async (req: Request, res: Response, next: Function) => {
    try {
        const adminId = parseInt(req.params.admin_id);
        const result = await getAdminDetailsService(adminId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE ADMIN CONTROLLER
export const updateAdminController = async (req: Request, res: Response, next: Function) => {
    try {
        const adminId = parseInt(req.params.admin_id);
        const data = req.body;
        console.log("Request Body for Update Admin:", data, adminId); // Debug log to check incoming data for update
        const result = await updateAdminService(data, adminId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE ADMIN STATUS CONTROLLER
export const updateAdminStatusController = async (req: Request, res: Response, next: Function) => {
    try {
        const adminId = parseInt(req.params.admin_id);
        const result = await updateAdminStatusService(adminId, req.body.status);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// GET MODULES LIST CONTROLLER
export const getModulesListController = async (req: Request, res: Response, next: Function) => {
    try {

        const filters = {
            date: req.query.date as string,
            status: req.query.status as string,
            fromDate: req.query.fromDate as string,
            toDate: req.query.toDate as string,
            page: req.query.page ? parseInt(req.query.page as string) : 1,
            limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
            search: req.query.search as string,
        }

        const result = await getModulesListService(filters);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD MODULE CONTROLLER
export const addModuleController = async (req: Request, res: Response, next: Function) => {
    try {
        const data = req.body;
        console.log("Request Body for Add Module:", data);
        const result = await addModuleService(data);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH MODULE DETAILS CONTROLLER
export const getModuleDetailsController = async (req: Request, res: Response, next: Function) => {
    try {
        const moduleId = parseInt(req.params.module_id);
        const result = await getModuleDetailsService(moduleId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE MODULE CONTROLLER
export const updateModuleController = async (req: Request, res: Response, next: Function) => {
    try {
        const moduleId = parseInt(req.params.module_id);
        const data = req.body;
        console.log("Request Body for Update Module:", data, moduleId);
        const result = await updateModuleService(data, moduleId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE MODULE STATUS CONTROLLER
export const updateModuleStatusController = async (req: Request, res: Response, next: Function) => {
    try {
        const moduleId = parseInt(req.params.module_id);
        const result = await updateModuleStatusService(moduleId, req.body.status);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};



//--------------------------------------------------OPERATIONS CONTROLLERS--------------------------------------------------//

// GET OPERATIONS LIST CONTROLLER
export const getOperationsListController = async (req: Request, res: Response, next: Function) => {
    try {
        const filters = {
            date: req.query.date as string,
            fromDate: req.query.fromDate as string,
            toDate: req.query.toDate as string,
            page: req.query.page ? parseInt(req.query.page as string) : 1,
            limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
            search: req.query.search as string,
        }
        const result = await getOperationsListService(filters);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// ADD OPERATION CONTROLLER
export const addOperationController = async (req: Request, res: Response, next: Function) => {
    try {
        const data = req.body;
        console.log("Request Body for Add Operation:", data);
        const result = await addOperationService(data);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// GET OPERATION DETAILS CONTROLLER
export const getOperationDetailsController = async (req: Request, res: Response, next: Function) => {
    try {
        const operationId = parseInt(req.params.operation_id);
        const result = await getOperationDetailsService(operationId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE OPERATION CONTROLLER
export const updateOperationController = async (req: Request, res: Response, next: Function) => {
    try {
        const operationId = parseInt(req.params.operation_id);
        const data = req.body;
        console.log("Request Body for Update Operation:", data, operationId);
        const result = await updateOperationService(data, operationId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH ALL MODULES AND OPERATIONS CONTROLLER
export const fetchAllModuleAndOperationsController = async (req: Request, res: Response, next: Function) => {
    try {
        const roleId = parseInt(req.params.role_id);
        const result = await fetchAllModuleAndOperationsService(roleId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// UPDATE PERMISSIONS CONTROLLER
export const updatePermissionsController = async (req: Request, res: Response, next: Function) => {
    try {
        const roleId = parseInt(req.params.role_id);
        const permissions = req.body;
        // console.log("Request Body for Update Permissions:", permissions, roleId);
        const result = await updatePermissionsService(roleId, permissions);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// FETCH DATA FOR SIDEBAR CONTROLLER
export const fetchDataForSideBarController = async (req: Request, res: Response, next: Function) => {
    try {

        const roleId = Number(req.body?.role_id);

        if (!roleId) {
            return res.status(400).json({ status: 400, message: "Role ID is required" });
        }

        const result = await fetchDataForSideBarService(roleId);
        return res.status(result.status).json(result);

    } catch (error) {
        next(error);
    }
};