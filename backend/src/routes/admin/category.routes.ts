import { Router } from "express";
import { addCategoryLevelOneController, addCategoryLevelTwoController, getCategoryLevelOneDetailsController, getCategoryLevelOneListController, getCategoryLevelTwoDetailsController, getCategoryLevelTwoListController, updateCategoryLevelOneController, updateCategoryLevelOneStatusController, updateCategoryLevelTwoController, updateCategoryLevelTwoStatusController } from "../../controller/admin/category.controller";
const router = Router();

//------------------------------- CATEGORY LEVEL ONE ROUTES -----------------------------
router.get("/get_category_level_one_list", getCategoryLevelOneListController);
router.post("/add_category_level_one", addCategoryLevelOneController);
router.get("/get_category_level_one/:catLvl1Id", getCategoryLevelOneDetailsController);
router.put("/update_category_level_one/:catLvl1Id", updateCategoryLevelOneController);
router.patch("/update_category_level_one_status/:catLvl1Id", updateCategoryLevelOneStatusController);



//------------------------------- CATEGORY LEVEL TWO ROUTES -----------------------------
router.get("/get_category_level_two_list", getCategoryLevelTwoListController);
router.post("/add_category_level_two", addCategoryLevelTwoController);
router.get("/get_category_level_two/:catLvl2Id", getCategoryLevelTwoDetailsController);
router.put("/update_category_level_two/:catLvl2Id", updateCategoryLevelTwoController);
router.patch("/update_category_level_two_status/:catLvl2Id", updateCategoryLevelTwoStatusController);

export default router;