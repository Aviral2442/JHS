import { Router } from "express";
import { addCategoryLevelOneController, getCategoryLevelOneDetailsController, getCategoryLevelOneListController, updateCategoryLevelOneController, updateCategoryLevelOneStatusController } from "../../controller/admin/category.controller";
const router = Router();

// CATEGORY LEVEL ONE ROUTES
router.get("/get_category_level_one_list", getCategoryLevelOneListController);
router.post("/add_category_level_one", addCategoryLevelOneController);
router.get("/get_category_level_one/:catLvl1Id", getCategoryLevelOneDetailsController);
router.put("/update_category_level_one/:catLvl1Id", updateCategoryLevelOneController);
router.patch("/update_category_level_one_status/:catLvl1Id", updateCategoryLevelOneStatusController);



export default router;