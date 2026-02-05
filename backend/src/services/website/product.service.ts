import dbConfig from '../../config/db_Config';
import { currentUnixTimeStamp } from '../../utils/CurrentUnixTimeStamp';
import  { saveBase64File } from '../../middleware/base64FileUpload';
import { ApiError } from '../../utils/ApiError';

interface CategoryLavel3 {
  cl3_name: string;
  cl3_image: string;
  cl3_status: string;
  extension: string;
}

// CREATE CATEGORY LEVEL 3 SERVICE
export const createCategoryLavel3Service = async (data: CategoryLavel3) => {
  try {
    const { cl3_name, cl3_image, cl3_status, extension } = data;

    let imagePath = '';
    imagePath = saveBase64File(
      cl3_image,
      'category_level3',
      'cl3_image',
      extension
    );

    const [result] = await dbConfig.execute(
      'INSERT INTO category_level3 (cl3_name, cl3_image, cl3_status, created_at) VALUES (?, ?, ?, ?)',
      [cl3_name, imagePath, cl3_status, currentUnixTimeStamp()]
    );

    return {
      status: 200,
      message: 'Category Level 3 created successfully',
      data: result,
    }

  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Create Category Level 3 Error On Fetching");
  }
};
