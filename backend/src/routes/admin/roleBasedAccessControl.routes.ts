import { Router } from 'express';
import { addAdminController, addModuleController, addRoleController, getAdminDetailsController, getAdminsListController, getModuleDetailsController, getModulesListController, getRoleDetailsController, roleListController, updateAdminController, updateModuleController, updateRoleController, updateRoleStatusController, updateAdminStatusController, updateModuleStatusController, getOperationsListController, addOperationController, getOperationDetailsController, updateOperationController, fetchAllModuleAndOperationsController, updatePermissionsController, fetchDataForSideBarController } from '../../controller/admin/roleBasedAccessControl.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
const router = Router();

// ROLES ROUTES
router.get('/role_list', roleListController);
router.post('/add_role', addRoleController);
router.get('/role_data_fetch/:role_id', getRoleDetailsController);
router.put('/update_role/:role_id', updateRoleController);
router.patch('/update_role_status/:role_id', updateRoleStatusController);

// ADMIN ROUTES
router.get('/admin_list', getAdminsListController);
router.post('/add_admin', addAdminController);
router.get('/admin_data_fetch/:admin_id', getAdminDetailsController);
router.put('/update_admin/:admin_id', updateAdminController);
router.patch('/update_admin_status/:admin_id', updateAdminStatusController);

// MODULES ROUTES
router.get('/get_modules_list', getModulesListController);
router.post('/add_module', addModuleController);
router.get('/module_data_fetch/:module_id', getModuleDetailsController);
router.put('/update_module/:module_id', updateModuleController);
router.patch('/update_module_status/:module_id', updateModuleStatusController);

// OPERATIONS ROUTES
router.get('/get_operations_list', getOperationsListController);
router.post('/add_operation', addOperationController);
router.get('/operation_data_fetch/:operation_id', getOperationDetailsController);
router.put('/update_operation/:operation_id', updateOperationController);

// PERMISSIONS ROUTES
router.get('/fetch_all_modules_and_operations/:role_id', fetchAllModuleAndOperationsController);
router.put('/update_permissions/:role_id', updatePermissionsController);

// SIDE BAR DATA ROUTE
router.get('/fetch_data_for_sidebar', authMiddleware, fetchDataForSideBarController);

export default router;