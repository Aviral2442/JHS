import dbConfig from '../../config/db_Config';
import { currentUnixTimeStamp } from '../../utils/CurrentUnixTimeStamp';
import { saveBase64File } from '../../middleware/base64FileUpload';
import { ApiError } from '../../utils/ApiError';
import { buildFilters } from '../../utils/filters';

// GET PRODUCT SERVICE
export const getProductListService = async (filters?: {
  date?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  search?: string;
}, category?: string) => {
  try {
    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const limit = filters?.limit && filters.limit > 0 ? filters.limit : 10;
    const offset = (page - 1) * limit;
    const searchTerm = filters?.search ? `%${filters.search}%` : null;

    const { whereSQL, params } = buildFilters({
      ...filters,
      dateColumn: "service.service_createdAt",
    });

    let finalWhereSQL = whereSQL;

    if (filters?.status) {
      const statusConditionMap: Record<string, string> = {
        active: "service.service_status = 0",
        inactive: "service.service_status = 1",
      };

      const condition = statusConditionMap[filters.status];

      if (condition) {
        if (/where\s+/i.test(finalWhereSQL)) {
          finalWhereSQL += ` AND ${condition}`;
        } else {
          finalWhereSQL += ` WHERE ${condition}`;
        }
      }
    }

    if (searchTerm) {
      const searchConditon = `service.service_title LIKE ? OR service.service_id LIKE ?`;
      if (/where\s+/i.test(finalWhereSQL)) {
        finalWhereSQL += ` AND (${searchConditon})`;
      } else {
        finalWhereSQL += ` WHERE ${searchConditon}`;
      }
      params.push(searchTerm, searchTerm, searchTerm);
    }

    const isDateFilerApplied = filters?.date || (filters?.fromDate && filters?.toDate);
    const isStatusFilterApplied = !!filters?.status;
    const isSearchFilterApplied = !!filters?.search;
    const noFilterApplied = !isDateFilerApplied && !isStatusFilterApplied && !isSearchFilterApplied;

    let effectiveLimit = limit;
    let effectiveOffset = offset;

    if (noFilterApplied) {
      effectiveLimit = limit;
      effectiveOffset = (page - 1) * limit;
    }

    const query = `
            SELECT
                service.service_id,
                service.service_title,
                service.service_primary_img,
                service.service_fixed_price,
                service.service_status,
                service.service_createdAt,
                category_level_1.category_level1_name
              FROM
            service
            LEFT JOIN category_level_1 ON service.category_level_1_id = category_level_1.category_level_1_id
            ${finalWhereSQL}
            WHERE category_level_1.category_level_1_id = ${category}
            ORDER BY service.service_createdAt DESC
            LIMIT ? OFFSET ?
        `

    const queryParams = [...params, effectiveLimit, effectiveOffset];
    const [rows]: any = await dbConfig.query(query, queryParams);

    let total;

    if (noFilterApplied) {
      const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM service`);
      const acturalTotal = countAllRows[0]?.total || 0;

      if (acturalTotal < 100) {
        total = acturalTotal;
      } else {
        total = 100;
      }
    } else {
      const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM service ${finalWhereSQL}`, params);
      total = countAllRows[0]?.total || 0;
    }

    return {
      status: 200,
      message: "Product list fetched successfully.",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      jsonData: {
        product_list: rows,
      },
    };

  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "An error occurred while fetching the product list.",
      jsonData: {},
    }
  }
};

// ADD PRODUCT SERVICE
export const addProductService = async (data: any) => {
  try {

    const insertServiceData = {
      service_ctg_level_1: data.category_level_1_id,
      service_ctg_level_2: data.category_level_2_id,
      service_ctg_level_3: data.category_level_3_id,
      service_title: data.service_title,
      service_sku: data.service_sku,
      service_primary_img: '',
      service_fixed_price: data.service_fixed_price,
      service_offer_price: data.service_offer_price,
      service_duration_min: data.service_duration_min,
      service_status: 0,
      service_createdAt: currentUnixTimeStamp(),
    }

    const ServiceImg = saveBase64File(
      data.service_primary_img,
      "Services",
      "Service",
    );

    insertServiceData.service_primary_img = ServiceImg;

    const [ServiceResult]: any = await dbConfig.query(
      `INSERT INTO service SET ?`,
      [insertServiceData]
    );

    const insertedServiceId = ServiceResult.insertId;



    const insertServiceDetailsData = {
      service_detail_serviceId: insertedServiceId,
      service_detail_short_desc: data.service_detail_short_desc,
      service_detail_long_desc: data.service_detail_long_desc,
      service_detail_includes: data.service_detail_includes,
      service_detail_excluded: data.service_detail_excluded,
      service_detail_please_note: data.service_detail_please_note,
      service_detail_see_the_diff_img: data.service_detail_see_the_diff_img,
      service_detail_needed_from_consumer: data.service_detail_needed_from_consumer,
    }

    const serviceDetailSeeTheDiffImg = saveBase64File(
      data.service_detail_see_the_diff_img,
      "Services",
      "Service",
    );

    insertServiceDetailsData.service_detail_see_the_diff_img = serviceDetailSeeTheDiffImg;

    const [ServiceDetailsResult]: any = await dbConfig.query(
      `INSERT INTO service_detail SET ?`,
      [insertServiceDetailsData]
    );

    if (!ServiceResult.affectedRows || !ServiceDetailsResult.affectedRows) {
      throw new ApiError(500, "Failed to add the product.");
    }

    return {
      status: 200,
      message: "Product added successfully.",
      jsonData: {
        service_id: insertedServiceId,
      },
    };

  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "An error occurred while adding the product.",
      jsonData: {},
    }
  }
};

// FETCH PRODUCT DETAILS SERVICE
export const fetchProductDetailsService = async (service_id: number) => {
  try {
    const [results]: any = await dbConfig.query(
      `SELECT * FROM service
       LEFT JOIN service_detail ON service.service_id = service_detail.service_detail_serviceId
       WHERE service.service_id = ?`,
      [service_id]
    );

    if (results.length === 0) {
      return {
        status: 404,
        message: "Product not found.",
        jsonData: {},
      };
    }

    return {
      status: 200,
      message: "Product details fetched successfully.",
      jsonData: {
        product_details: results[0],
      },
    };

  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "An error occurred while fetching the product details.",
      jsonData: {},
    }
  }
};

// UPDATE PRODUCT SERVICE
export const updateProductService = async (service_id: number, data: any) => {
  try {
    const updateServiceData: any = {};
    if (data.category_level_1_id) updateServiceData.service_ctg_level_1 = data.category_level_1_id;
    if (data.category_level_2_id) updateServiceData.service_ctg_level_2 = data.category_level_2_id;
    if (data.category_level_3_id) updateServiceData.service_ctg_level_3 = data.category_level_3_id;
    if (data.service_title) updateServiceData.service_title = data.service_title;
    if (data.service_sku) updateServiceData.service_sku = data.service_sku;
    if (data.service_primary_img) updateServiceData.service_primary_img = saveBase64File(
      data.service_primary_img,
      "Services",
      "Service",
    )
    if (data.service_fixed_price) updateServiceData.service_fixed_price = data.service_fixed_price;
    if (data.service_offer_price) updateServiceData.service_offer_price = data.service_offer_price;
    if (data.service_duration_min) updateServiceData.service_duration_min = data.service_duration_min;
    if (data.service_status !== undefined) updateServiceData.service_status = data.service_status;

    const [updateServiceResult]: any = await dbConfig.query(
      `UPDATE service SET ? WHERE service_id = ?`,
      [updateServiceData, service_id]
    );

    const updateServiceDetailsData: any = {};
    if (data.service_detail_short_desc) updateServiceDetailsData.service_detail_short_desc = data.service_detail_short_desc;
    if (data.service_detail_long_desc) updateServiceDetailsData.service_detail_long_desc = data.service_detail_long_desc;
    if (data.service_detail_includes) updateServiceDetailsData.service_detail_includes = data.service_detail_includes;
    if (data.service_detail_excluded) updateServiceDetailsData.service_detail_excluded = data.service_detail_excluded;
    if (data.service_detail_please_note) updateServiceDetailsData.service_detail_please_note = data.service_detail_please_note;
    if (data.service_detail_see_the_diff_img) updateServiceDetailsData.service_detail_see_the_diff_img = saveBase64File(
      data.service_detail_see_the_diff_img,
      "Services",
      "Service",
    )
    if (data.service_detail_needed_from_consumer) updateServiceDetailsData.service_detail_needed_from_consumer = data.service_detail_needed_from_consumer;

    const [updateServiceDetailsResult]: any = await dbConfig.query(
      `UPDATE service_detail SET ? WHERE service_detail_serviceId = ?`,
      [updateServiceDetailsData, service_id]
    );

    if (!updateServiceResult.affectedRows || !updateServiceDetailsResult.affectedRows) {
      throw new ApiError(500, "Failed to update the product.");
    }

    return {
      status: 200,
      message: "Product updated successfully."
    };

  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "An error occurred while updating the product.",
      jsonData: {},
    }
  }
};

// UPDATE PRODUCT STATUS SERVICE
export const updateProductStatusService = async (service_id: number, newStatus: string) => {
  try {
    const [updateResult]: any = await dbConfig.query(
      `UPDATE service SET service_status = ? WHERE service_id = ?`,
      [newStatus, service_id]
    );

    if (!updateResult.affectedRows) {
      throw new ApiError(500, "Failed to update the product status.");
    }

    return {
      status: 200,
      message: "Product status updated successfully."
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "An error occurred while updating the product status.",
      jsonData: {},
    }
  }
};