import { Router } from "express";
import { addRoleController, getRoleDetailController, getRoleListController, updateRoleController, updateRoleStatusController } from "../../controller/admin/roleBasedAccessControl.controller";

const router = Router();

//----------------------------------------------ROLE ROUTES----------------------------------------------//
router.get('/get_role_list', getRoleListController);
router.post('/add_role', addRoleController);
router.get('/get_role_details/:role_id', getRoleDetailController);
router.put('/update_role_details/:role_id', updateRoleController);
router.patch('/update_role_status/:role_id', updateRoleStatusController);

export default router;