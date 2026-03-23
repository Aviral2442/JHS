import { Router } from "express";
import { addModuleController, addRoleController, getModuleDetailController, getModuleListController, getRoleDetailController, getRoleListController, getSidebarController, updateModuleController, updateModuleStatusController, updateRoleController, updateRoleStatusController } from "../../controller/admin/roleBasedAccessControl.controller";
// import { verifyToken } from "../../utils/jwt";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

//----------------------------------------------ROLE ROUTES----------------------------------------------//
router.get('/get_role_list', getRoleListController);
router.post('/add_role', addRoleController);
router.get('/get_role_details/:role_id', getRoleDetailController);
router.put('/update_role_details/:role_id', updateRoleController);
router.patch('/update_role_status/:role_id', updateRoleStatusController);


//----------------------------------------------MODULES ROUTES----------------------------------------------//
router.get('/get_module_list', getModuleListController);
router.post('/add_module', addModuleController);
router.get('/get_module_details/:module_id', getModuleDetailController);
router.put('/update_module_details/:module_id', updateModuleController);
router.patch('/update_module_status/:module_id', updateModuleStatusController);


router.get("/sidebar", authMiddleware, getSidebarController);

export default router;