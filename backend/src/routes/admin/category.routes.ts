import { Router } from "express";
import { addBlogController, addCategoryLevelOneController, addCategoryLevelThreeController, addCategoryLevelTwoController, getBlogDetailsController, getBlogListController, getCategoryLevelOneDetailsController, getCategoryLevelOneListController, getCategoryLevelThreeDetailsController, getCategoryLevelThreeListController, getCategoryLevelTwoDetailsController, getCategoryLevelTwoListController, updateBlogController, updateBlogStatusController, updateCategoryLevelOneController, updateCategoryLevelOneStatusController, updateCategoryLevelThreeController, updateCategoryLevelThreeStatusController, updateCategoryLevelTwoController, updateCategoryLevelTwoStatusController } from "../../controller/admin/category.controller";
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



//------------------------------- CATEGORY LEVEL THREE ROUTES -----------------------------
router.get("/get_category_level_three_list", getCategoryLevelThreeListController);
router.post("/add_category_level_three", addCategoryLevelThreeController);
router.get("/get_category_level_three/:catLvl3Id", getCategoryLevelThreeDetailsController);
router.put("/update_category_level_three/:catLvl3Id", updateCategoryLevelThreeController);
router.patch("/update_category_level_three_status/:catLvl3Id", updateCategoryLevelThreeStatusController);



//------------------------------- BLOG ROUTES -----------------------------
router.get("/get_blog_list", getBlogListController);
router.post("/add_blog", addBlogController);
router.get("/get_blog_details/:blogId", getBlogDetailsController);
router.put("/update_blog/:blogId", updateBlogController);
router.patch("/update_blog_status/:blogId", updateBlogStatusController);

export default router;