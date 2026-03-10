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
                data: response.data?.jsonData?.category_level_three_list || [],
                pagination: response.data?.pagination || {}
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

  const toggleStatusOFCategoryLevelOne = async (
    categoryId: number,
    newStatus: number
  ) => {
    try {
      const response = await axios.patch(`${baseURL}/api/category/update_category_level_one_status/${categoryId}`, {
        category_level1_status: newStatus
      });
      
      if (response.data?.status === 200) {
        return {
          success: true,
          message: response.data?.message || "Category level 1 status updated successfully",
        };
      } else {
        return {
          success: false,
          error: response.data?.message || "Failed to update category level 1 status",
        };
       }} catch (err) {
      console.error("Failed to update category level 1 status:", err);
      return {
        success: false,
        error: err || "An error occurred while updating category level 1 status",
      };
    }
  };

  const toggleStatusOFCategoryLevelTwo = async (
    categoryId: number,
    newStatus: number
  ) => {
    try {
      const response = await axios.patch(`${baseURL}/api/category/update_category_level_two_status/${categoryId}`, {
        category_level2_status: newStatus
      });
      
      if (response.data?.status === 200) {
        return {
          success: true,
          message: response.data?.message || "Category level 2 status updated successfully",
        };
      } else {
        return {
          success: false,
          error: response.data?.message || "Failed to update category level 2 status",
        };
       }} catch (err) {
      console.error("Failed to update category level 2 status:", err);
      return {
        success: false,
        error: err || "An error occurred while updating category level 2 status",
      };
    }
  };

  const toggleStatusOFCategoryLevelThree = async (
    categoryId: number,
    newStatus: number
  ) => {
    try {
      const response = await axios.patch(`${baseURL}/api/category/update_category_level_three_status/${categoryId}`, {
        category_level3_status: newStatus
      });
      console.log("Toggle Status Response:", response.data);
      if (response.data?.status === 200) {
        return {
          success: true,
          message: response.data?.message || "Category level 3 status updated successfully",
        };
      } else {
        return {
          success: false,
          error: response.data?.message || "Failed to update category level 3 status",
        };
       }} catch (err) {
      console.error("Failed to update category level 3 status:", err);
      return {
        success: false,
        error: err || "An error occurred while updating category level 3 status",
      };
    }
  };

  const fetchCategoryLevelTwoListByLevelOneId = async (levelOneId: number) => {
    try {
        const response = await axios.get(`${baseURL}/api/category/get_category_level_two_list_by_cat_lvl1_id/${levelOneId}`);
      return {
        success: true,
        message: response.data?.message || "Category level 2 list fetched successfully",
        data: response.data?.jsonData?.category_level_two_list || [],
      }
    } catch (error: any) {
      console.error("Error fetching cancelled with reopen booking data:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch cancelled with reopen booking data",
      }
    }
  };

  const fetchCategoryLevelThreeListByLevelTwoId = async (levelTwoId: number) => {
    try {
      const response = await axios.get(`${baseURL}/api/category/get_category_level_three_list_by_cat_lvl2_id/${levelTwoId}`);
      return {
        success: true,
        message: response.data?.message || "Category level 3 list fetched successfully",
        data: response.data?.jsonData?.category_level_three_list || [],
      }
    } catch (error: any) {
      console.error("Error fetching cancelled with reopen booking data:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch cancelled with reopen booking data",
    }
  }
  };

  const fetchBookingDetails = async (bookingId: number) => {
    try {
      const response = await axios.get(`${baseURL}/api/booking/fetch_booking_details/${bookingId}`);
      return {
        success: true,
        message: response.data?.message || "Booking details fetched successfully",
        data: response.data?.jsonData?.booking_details || null,
      }
    } catch (error: any) {
      console.error("Error fetching booking details:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch booking details",
      }
    }
  };

  const fetchVendorList = async (params?: Record<string, string | number>) => {
    try {
      const response = await axios.get(`${baseURL}/api/vendor/get_vendor_list`, { params });
      return {
        success: true,
        message: response.data?.message || "Vendor list fetched successfully",
        data: response.data?.jsonData?.vendor_list || [],
        pagination: response.data?.pagination || {},
      }
    } catch (error: any) {
      console.error("Error fetching vendor list:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch vendor list",
      }
    }
  };

  const searchVendorByItsNumber = async (vendorNumber: string) => {
    try {
      const response = await axios.get(`${baseURL}/api/vendor/search_vendor`,{
        params: { search: vendorNumber }
      });
      return {
        success: true,
        message: response.data?.message || "Vendor search completed successfully",
        data: response.data?.jsonData?.vendor_list || [],
      }
    } catch (error: any) {
      console.error("Error searching vendor by its number:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to search vendor by its number",
      }
    }
  };

  const searchConsumerByItsNumber = async (consumerNumber: string) => {
    try {
      const response = await axios.get(`${baseURL}/api/consumer/search_consumer`,{
        params: { search: consumerNumber }
      });
      return {
        success: true,
        message: response.data?.message || "Consumer search completed successfully",
        data: response.data?.jsonData?.consumer_list || [],
      }
    } catch (error: any) {
      console.error("Error searching consumer by its number:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to search consumer by its number",
      }
    }
  };



  const fetchBlogList = async (params?: Record<string, string | number>) => {
    try {
      const response = await axios.get(`${baseURL}/api/category/get_blog_list`, { params });
      if (response.data?.status === 200) {
        return {
          success: true,
          data: response.data?.jsonData?.blog_list || [],
          pagination: response.data?.pagination || {},
        };
      } else {
        return {
          success: false,
          error: response.data?.message || "Failed to fetch blog list",
        };
      }
    } catch (err) {
      console.error("Failed to fetch blog list:", err);
      return {
        success: false,
        error: err || "An error occurred while fetching blog list",
      };
    }
  };

  return {
    fetchCategoryLevelOneList,
    fetchCategoryLevelTwoList,
    fetchCategoryLevelThreeList,
    toggleStatusOFCategoryLevelOne,
    toggleStatusOFCategoryLevelTwo,
    toggleStatusOFCategoryLevelThree,
    fetchCategoryLevelTwoListByLevelOneId,
    fetchCategoryLevelThreeListByLevelTwoId,
    fetchBookingDetails,
    fetchVendorList,
    searchVendorByItsNumber,
    searchConsumerByItsNumber,
    fetchBlogList,
  };
};
export default Api;
