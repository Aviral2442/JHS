import axios from "axios";
const baseURL = (import.meta as any).env?.VITE_URL ?? "";

const Api = () => {

  const fetchCategoryLevelOneList = async (params?: Record<string, string | number>) => {
    try {
      const response = await axios.get(`${baseURL}/api/category/get_category_level_one_list`, { params });
      if (response.data?.status === 200) {
        return { 
            success: true, 
            data: response.data?.jsonData?.category_level_one_list || [],
            pagination: response.data?.pagination || {}
        };
      } else {
        return {
          success: false,
          error: response.data?.message || "Failed to fetch category level 1 list",
        };
      }
    } catch (err) {
      console.error("Failed to fetch category level 1 list:", err);
      return {
        success: false,
        error: err || "An error occurred while fetching category level 1 list",
      };
    }
  };

  const fetchCategoryLevelTwoList = async (params?: Record<string, string | number>) => {
    try {
        const response = await axios.get(`${baseURL}/api/category/get_category_level_two_list`, { params });
        if (response.data?.status === 200) {
            return { 
                success: true, 
                data: response.data?.jsonData?.category_level_two_list || [],
                pagination: response.data?.pagination || {}
            };
        } else {
            return {
                success: false,
                error: response.data?.message || "Failed to fetch category level 2 list",
            };
        }
    } catch (err) {
        return {
            success: false,
            error: err || "An error occurred while fetching category level 2 list",
        }
    }
  };

  const fetchCategoryLevelThreeList = async (params?: Record<string, string | number>) => {
    try {

        const response = await axios.get(`${baseURL}/api/category/get_category_level_three_list`, { params });
        console.log("Category Level 3 List:", response.data);
        if (response.data?.status === 200) {
            return { 
                success: true, 
                data: response.data?.jsonData?.category_level_three_list || [] 
            };
        } else {
            return {
                success: false,
                error: response.data?.message || "Failed to fetch category level 3 list",
            };
        }

    } catch (err) {
        return {
            success: false,
            error: err || "An error occurred while fetching category level 3 list",
        }
    }
  };



  return {
    fetchCategoryLevelOneList,
    fetchCategoryLevelTwoList,
    fetchCategoryLevelThreeList,
  };
};
export default Api;
