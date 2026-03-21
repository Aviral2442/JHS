import { Router } from 'express';
import { addProductController, getProductDetailController, getProductListController, updateProductController, updateProductStatusController } from '../../controller/website/product.controller';

const router = Router();

router.get('get_product_list', getProductListController);
router.post('/add_product_data', addProductController);
router.get('/get_product_details', getProductDetailController);
router.put('/update_product_details', updateProductController)
router.patch('/update_product_status', updateProductStatusController)

export default router;
