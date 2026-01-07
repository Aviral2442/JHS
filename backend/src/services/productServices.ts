import dbConfig from '../config/db_Config';
import { currentUnixTimeStamp } from '../utils/currentUnixTimeStamp';

interface CategoryLavel3 {
  cl3_name: string;
  cl3_image: string;
  cl3_status: string;
}

// CREATE CATEGORY LEVEL 3 SERVICE
export const createCategoryLavel3Service = async (data: CategoryLavel3) => {
  const query = `
    INSERT INTO category_level3 
    (cl3_name, cl3_image, cl3_status, created_at) 
    VALUES (?, ?, ?, ?)
  `;
  const params = [data.cl3_name, data.cl3_image, data.cl3_status, currentUnixTimeStamp()];
  const [result] = await dbConfig.execute(query, params);
  return result;
};
