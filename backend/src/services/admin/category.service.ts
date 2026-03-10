import dbConfig from "../../config/db_Config";
import { ApiError } from "../../utils/ApiError";
import { saveBase64File } from "../../middleware/base64FileUpload";
import { buildFilters } from "../../utils/filters";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";


//----------------------------------------------CATEGORY LEVEL ONE SERVICES----------------------------------------------//

// GET CATEGORY LEVEL ONE LIST SERVICE
export const getCategoryLevelOneListService = async (filters?: {
    date?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    limit?: number;
    search?: string;
}) => {

    try {
        const page = filters?.page && filters.page > 0 ? filters.page : 1;
        const limit = filters?.limit && filters.limit > 0 ? filters.limit : 10;
        const offset = (page - 1) * limit;
        const searchTerm = filters?.search ? `%${filters.search}%` : null;

        const { whereSQL, params } = buildFilters({
            ...filters,
            dateColumn: "category_level_1.category_level1_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "category_level_1.category_level1_status = 0",
                inactive: "category_level_1.category_level1_status = 1",
            };

            const condition = statusConditionMap[filters.status];

            if (condition) {
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${condition}`;
                } else {
                    finalWhereSQL = `WHERE ${condition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `category_level_1.category_level1_name LIKE ? OR category_level_1.category_level1_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm);
        }

        // Detect filters
        const isDateFilterApplied = !!filters?.date || !!filters?.fromDate || !!filters?.toDate;
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFiltersApplied = !isDateFilterApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        // If NO FILTERS applied → force fixed 100-record window
        if (noFiltersApplied) {
            effectiveLimit = limit;              // per page limit (e.g., 10)
            effectiveOffset = (page - 1) * limit; // correct pagination
        }

        const query = `
            SELECT 
                category_level_1.*
            FROM category_level_1
            ${finalWhereSQL}
            ORDER BY category_level_1.category_level1_id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFiltersApplied) {
            // determine actual total count and cap at 100 when no filters applied
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM category_level_1`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }

        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM category_level_1 ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Category level One list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                category_level_one_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }

};

// ADD CATEGORY LEVEL ONE SERVICE
export const addCategoryLevelOneService = async (data: any) => {
    try {
        const insertData = {
            category_level1_name: data.category_level1_name,
            category_level1_img: "",
            category_level1_status: 0,
            category_level1_createdAt: currentUnixTimeStamp(),
        }

        const categoryImageOne = saveBase64File(
            data.category_level1_img,
            "category",
            "category_level_one",
            // data.extension || ""
        );

        insertData.category_level1_img = categoryImageOne;

        const result = await dbConfig.query(
            `INSERT INTO category_level_1 SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Category level One added successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// FETCH CATEGORY LEVEL ONE DETAILS SERVICE
export const getCategoryLevelOneDetailsService = async (category_level1_id: number) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT * FROM category_level_1 WHERE category_level1_id = ?`,
            [category_level1_id]
        );

        if (rows.length === 0) {
            return {
                status: 404,
                message: "Category level One not found",
                jsonData: {}
            };
        }

        return {
            status: 200,
            message: "Category level One details fetched successfully",
            jsonData: {
                category_level_one_details: rows[0]
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// UPDATE CATEGORY LEVEL ONE SERVICE
export const updateCategoryLevelOneService = async (category_level1_id: number, data: any) => {
    try {
        const updateData: any = {}
        if (data.category_level1_name) updateData.category_level1_name = data.category_level1_name;
        if (data.category_level1_img) updateData.category_level1_img = null;

        const categoryImageOne = saveBase64File(
            data.category_level1_img,
            "category",
            "category_level_one",
            // data.extension || ""
        );

        if (categoryImageOne) updateData.category_level1_img = categoryImageOne;

        await dbConfig.query(
            `UPDATE category_level_1 SET ? WHERE category_level1_id = ?`,
            [updateData, category_level1_id]
        );

        return {
            status: 200,
            message: "Category level One updated successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// UPDATE CATEGORY LEVEL ONE STATUS SERVICE
export const updateCategoryLevelOneStatusService = async (category_level1_id: number, status: string) => {
    try {
        const [result]: any = await dbConfig.query(
            `UPDATE category_level_1 SET category_level1_status = ? WHERE category_level1_id = ?`,
            [status, category_level1_id]
        );

        return {
            status: 200,
            message: "Category level One status updated successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    };
};





//----------------------------------------------CATEGORY LEVEL TWO SERVICES----------------------------------------------//

// GET CATEGORY LEVEL TWO LIST SERVICE
export const getCategoryLevelTwoListService = async (filters?: {
    date?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    limit?: number;
    search?: string;
}) => {

    try {
        const page = filters?.page && filters.page > 0 ? filters.page : 1;
        const limit = filters?.limit && filters.limit > 0 ? filters.limit : 10;
        const offset = (page - 1) * limit;
        const searchTerm = filters?.search ? `%${filters.search}%` : null;

        const { whereSQL, params } = buildFilters({
            ...filters,
            dateColumn: "category_level_2.category_level2_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "category_level_2.category_level2_status = 0",
                inactive: "category_level_2.category_level2_status = 1",
            };

            const condition = statusConditionMap[filters.status];

            if (condition) {
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${condition}`;
                } else {
                    finalWhereSQL = `WHERE ${condition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `category_level_2.category_level2_name LIKE ? OR category_level_2.category_level2_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm);
        }

        // Detect filters
        const isDateFilterApplied = !!filters?.date || !!filters?.fromDate || !!filters?.toDate;
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFiltersApplied = !isDateFilterApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        // If NO FILTERS applied → force fixed 100-record window
        if (noFiltersApplied) {
            effectiveLimit = limit;              // per page limit (e.g., 10)
            effectiveOffset = (page - 1) * limit; // correct pagination
        }

        const query = `
            SELECT 
                category_level_2.*,
                category_level_1.category_level1_name
            FROM category_level_2
            LEFT JOIN category_level_1 ON category_level_2.category_level2_level1_id = category_level_1.category_level1_id
            ${finalWhereSQL}
            ORDER BY category_level_2.category_level2_id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFiltersApplied) {
            // determine actual total count and cap at 100 when no filters applied
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM category_level_2`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }

        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM category_level_2 ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Category level Two list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                category_level_two_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }

};

// ADD CATEGORY LEVEL ONE SERVICE
export const addCategoryLevelTwoService = async (data: any) => {
    try {
        const insertData = {
            category_level2_level1_id: data.category_level2_level1_id,
            category_level2_name: data.category_level2_name,
            category_level2_img: "",
            category_level2_status: 0,
            category_level2_createdAt: currentUnixTimeStamp(),
        }

        const categoryImageOne = saveBase64File(
            data.category_level2_img,
            "category",
            "category_level_two",
        );

        insertData.category_level2_img = categoryImageOne;

        const result = await dbConfig.query(
            `INSERT INTO category_level_2 SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Category level Two added successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// FETCH CATEGORY LEVEL TWO DETAILS SERVICE
export const getCategoryLevelTwoDetailsService = async (category_level2_id: number) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT * FROM category_level_2 WHERE category_level2_id = ?`,
            [category_level2_id]
        );

        if (rows.length === 0) {
            return {
                status: 404,
                message: "Category level Two not found",
                jsonData: {}
            };
        }

        return {
            status: 200,
            message: "Category level Two details fetched successfully",
            jsonData: {
                category_level_two_details: rows[0]
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// UPDATE CATEGORY LEVEL TWO SERVICE
export const updateCategoryLevelTwoService = async (category_level2_id: number, data: any) => {
    try {
        const updateData: any = {}
        if (data.category_level2_level1_id) updateData.category_level2_level1_id = data.category_level2_level1_id;
        if (data.category_level2_name) updateData.category_level2_name = data.category_level2_name;
        if (data.category_level2_img) updateData.category_level2_img = null;

        const categoryImageTwo = saveBase64File(
            data.category_level2_img,
            "category",
            "category_level_two",
            // data.extension || ""
        );

        if (categoryImageTwo) updateData.category_level2_img = categoryImageTwo;

        await dbConfig.query(
            `UPDATE category_level_2 SET ? WHERE category_level2_id = ?`,
            [updateData, category_level2_id]
        );

        return {
            status: 200,
            message: "Category level Two updated successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// UPDATE CATEGORY LEVEL TWO STATUS SERVICE
export const updateCategoryLevelTwoStatusService = async (category_level2_id: number, status: string) => {
    try {
        const [result]: any = await dbConfig.query(
            `UPDATE category_level_2 SET category_level2_status = ? WHERE category_level2_id = ?`,
            [status, category_level2_id]
        );

        return {
            status: 200,
            message: "Category level Two status updated successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    };
};




//---------------------------------- CATEGORY LEVEL THREE SERVICE -----------------------------

// GET CATEGORY LEVEL THREE LIST SERVICE
export const getCategoryLevelThreeListService = async (filters?: {
    date?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    limit?: number;
    search?: string;
}) => {

    try {
        const page = filters?.page && filters.page > 0 ? filters.page : 1;
        const limit = filters?.limit && filters.limit > 0 ? filters.limit : 10;
        const offset = (page - 1) * limit;
        const searchTerm = filters?.search ? `%${filters.search}%` : null;

        const { whereSQL, params } = buildFilters({
            ...filters,
            dateColumn: "category_level_3.category_level3_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "category_level_3.category_level3_status = 0",
                inactive: "category_level_3.category_level3_status = 1",
            };

            const condition = statusConditionMap[filters.status];

            if (condition) {
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${condition}`;
                } else {
                    finalWhereSQL = `WHERE ${condition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `category_level_3.category_level3_name LIKE ? OR category_level_3.category_level3_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm);
        }

        // Detect filters
        const isDateFilterApplied = !!filters?.date || !!filters?.fromDate || !!filters?.toDate;
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFiltersApplied = !isDateFilterApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        // If NO FILTERS applied → force fixed 100-record window
        if (noFiltersApplied) {
            effectiveLimit = limit;              // per page limit (e.g., 10)
            effectiveOffset = (page - 1) * limit; // correct pagination
        }

        const query = `
            SELECT 
                category_level_3.*,
                category_level_2.category_level2_name
            FROM category_level_3
            ${finalWhereSQL}
            LEFT JOIN category_level_2 ON category_level_3.category_level3_level2_id = category_level_2.category_level2_id
            ORDER BY category_level_3.category_level3_id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFiltersApplied) {
            // determine actual total count and cap at 100 when no filters applied
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM category_level_3`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }

        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM category_level_3 ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Category level Three list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                category_level_three_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }

};

// ADD CATEGORY LEVEL THREE SERVICE
export const addCategoryLevelThreeService = async (data: any) => {
    try {
        const insertData = {
            category_level3_level2_id: data.category_level3_level2_id,
            category_level3_name: data.category_level3_name,
            category_level3_img: "",
            category_level3_status: 0,
            category_level3_createdAt: currentUnixTimeStamp(),
        }

        const categoryImageOne = saveBase64File(
            data.category_level3_img,
            "category",
            "category_level_three",
        );

        insertData.category_level3_img = categoryImageOne;

        const result = await dbConfig.query(
            `INSERT INTO category_level_3 SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Category level Three added successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// FETCH CATEGORY LEVEL THREE DETAILS SERVICE
export const getCategoryLevelThreeDetailsService = async (category_level3_id: number) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT * FROM category_level_3 WHERE category_level3_id = ?`,
            [category_level3_id]
        );

        if (rows.length === 0) {
            return {
                status: 404,
                message: "Category level Three not found",
                jsonData: {}
            };
        }

        return {
            status: 200,
            message: "Category level Three details fetched successfully",
            jsonData: {
                category_level_three_details: rows[0]
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// UPDATE CATEGORY LEVEL THREE SERVICE
export const updateCategoryLevelThreeService = async (category_level3_id: number, data: any) => {
    try {
        const updateData: any = {}
        if (data.category_level3_level2_id) updateData.category_level3_level2_id = data.category_level3_level2_id;
        if (data.category_level3_name) updateData.category_level3_name = data.category_level3_name;
        if (data.category_level3_img) updateData.category_level3_img = null;

        const categoryImageThree = saveBase64File(
            data.category_level3_img,
            "category",
            "category_level_three",
            // data.extension || ""
        );

        if (categoryImageThree) updateData.category_level3_img = categoryImageThree;

        await dbConfig.query(
            `UPDATE category_level_3 SET ? WHERE category_level3_id = ?`,
            [updateData, category_level3_id]
        );

        return {
            status: 200,
            message: "Category level Three updated successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// UPDATE CATEGORY LEVEL THREE STATUS SERVICE
export const updateCategoryLevelThreeStatusService = async (category_level3_id: number, status: string) => {
    try {
        const [result]: any = await dbConfig.query(
            `UPDATE category_level_3 SET category_level3_status = ? WHERE category_level3_id = ?`,
            [status, category_level3_id]
        );

        return {
            status: 200,
            message: "Category level Three status updated successfully",
            jsonData: {}
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    };
};



//-------------------------------- CATEGORY LIST BY ID ROUTES -----------------------------
export const getCategoryTwoListByCategoryOneIdService = async (category_level1_id: number) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT category_level2_id, category_level2_name FROM category_level_2 WHERE category_level2_level1_id = ?`,
            [category_level1_id]
        );

        return {
            status: 200,
            message: "Category level Two list fetched successfully",
            jsonData: {
                category_level_two_list: rows
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

export const getCategoryThreeListByCategoryTwoIdService = async (category_level2_id: number) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT category_level3_id, category_level3_name FROM category_level_3 WHERE category_level3_level2_id = ?`,
            [category_level2_id]
        );

        return {
            status: 200,
            message: "Category level Three list fetched successfully",
            jsonData: {
                category_level_three_list: rows
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// ---------------------------------- SERVICES --------------------------------
export const getServicesListService = async (filters?: {
    date?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    limit?: number;
    search?: string;
}) => {

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
                    finalWhereSQL = `WHERE ${condition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `service.service_title LIKE ? OR service.service_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm);
        }

        // Detect filters
        const isDateFilterApplied = !!filters?.date || !!filters?.fromDate || !!filters?.toDate;
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFiltersApplied = !isDateFilterApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        // If NO FILTERS applied → force fixed 100-record window
        if (noFiltersApplied) {
            effectiveLimit = limit;              // per page limit (e.g., 10)
            effectiveOffset = (page - 1) * limit; // correct pagination
        }

        const query = `
            SELECT 
                service.service_id,
                service.service_ctg_level_1,
                service.service_title,
                service.service_primary_img,
                service.service_offer_price,
                service.service_duration_min,
                service.service_status,
                service.service_createdAt
            FROM service
            ${finalWhereSQL}
            ORDER BY service.service_id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFiltersApplied) {
            // determine actual total count and cap at 100 when no filters applied
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM service`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }

        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM service ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Service list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                service_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }

};

export const addServicesService = async (data: any) => {
    try {
        const insertData = {
            service_ctg_level_1: data.service_ctg_level_1,
            service_ctg_level_2: data.service_ctg_level_2,
            service_ctg_level_3: data.service_ctg_level_3,
            service_title: data.service_title,
            service_primary_img: "",
            service_fixed_price: data.service_fixed_price,
            service_offer_price: data.service_offer_price,
            service_duration_min: data.service_duration_min,
            service_status: 0,
            service_createdAt: currentUnixTimeStamp(),
        }

        const servicePrimaryImage = saveBase64File(
            data.service_primary_img,
            "service",
            "primary_images",
        );

        insertData.service_primary_img = servicePrimaryImage;

        const result = await dbConfig.query(
            `INSERT INTO service SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Service added successfully",
            jsonData: {}
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

export const getServiceDatabyIdService = async (service_id: number) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT * FROM service WHERE service_id = ?`,
            [service_id]
        );

        if (rows.length === 0) {
            return {
                status: 404,
                message: "Service not found",
                jsonData: {}
            };
        }

        return {
            status: 200,
            message: "Service details fetched successfully",
            jsonData: {
                service_details: rows[0]
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

export const updateServicesService = async (service_id: number, data: any) => {
    try {
        const updateData: any = {}

        if (data.service_ctg_level_1) updateData.service_ctg_level_1 = data.service_ctg_level_1;
        if (data.service_ctg_level_2) updateData.service_ctg_level_2 = data.service_ctg_level_2;
        if (data.service_ctg_level_3) updateData.service_ctg_level_3 = data.service_ctg_level_3;
        if (data.service_title) updateData.service_title = data.service_title;
        if (data.service_fixed_price) updateData.service_fixed_price = data.service_fixed_price;
        if (data.service_offer_price) updateData.service_offer_price = data.service_offer_price;
        if (data.service_duration_min) updateData.service_duration_min = data.service_duration_min;
        updateData.service_updatedAt = currentUnixTimeStamp();

        const servicePrimaryImage = saveBase64File(
            data.service_primary_img,
            "service",
            "primary_images",
        );

        if (servicePrimaryImage) {
            updateData.service_primary_img = servicePrimaryImage;
        }

        const result = await dbConfig.query(
            `UPDATE service SET ? WHERE service_id = ?`,
            [updateData, service_id]
        );

        return {
            status: 200,
            message: "Service updated successfully",
            jsonData: {}
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

export const updateServiceStatusService = async (service_id: number, status: number) => {
    try {
        const [result]: any = await dbConfig.query(
            `UPDATE service SET service_status = ? WHERE service_id = ?`,
            [status, service_id]
        );

        return {
            status: 200,
            message: "Service status updated successfully",
            jsonData: {}
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// ---------------------------------- BLOG SERVICES --------------------------------
export const getBlogListService = async (filters?: {
    date?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    limit?: number;
    search?: string;
}) => {

    try {
        const page = filters?.page && filters.page > 0 ? filters.page : 1;
        const limit = filters?.limit && filters.limit > 0 ? filters.limit : 10;
        const offset = (page - 1) * limit;
        const searchTerm = filters?.search ? `%${filters.search}%` : null;

        const { whereSQL, params } = buildFilters({
            ...filters,
            dateColumn: "blog.blog_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "blog.blog_status = 0",
                inactive: "blog.blog_status = 1",
            };

            const condition = statusConditionMap[filters.status];

            if (condition) {
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${condition}`;
                } else {
                    finalWhereSQL = `WHERE ${condition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `blog.blog_title LIKE ? OR blog.blog_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm);
        }

        // Detect filters
        const isDateFilterApplied = !!filters?.date || !!filters?.fromDate || !!filters?.toDate;
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFiltersApplied = !isDateFilterApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        // If NO FILTERS applied → force fixed 100-record window
        if (noFiltersApplied) {
            effectiveLimit = limit;              // per page limit (e.g., 10)
            effectiveOffset = (page - 1) * limit; // correct pagination
        }

        const query = `
            SELECT 
                blog.blog_id,
                blog.blog_title,
                blog.blog_short_desc,
                blog.blog_thumbnail,
                blog.blog_createdAt,
                blog.blog_status
            FROM blog
            ${finalWhereSQL}
            ORDER BY blog.blog_id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFiltersApplied) {
            // determine actual total count and cap at 100 when no filters applied
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM blog`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }

        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM blog ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Blog list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                blog_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }

};

// ADD BLOG SERVICE
export const addBlogService = async (data: any) => {
    try {
        const insertData = {
            blog_category_id: data.blog_category_id,
            blog_title: data.blog_title,
            blog_short_desc: data.blog_short_desc,
            blog_title_sku: data.blog_title_sku,
            blog_long_desc: data.blog_long_desc,
            blog_thumbnail: "",
            blog_tags: data.blog_tags,
            blog_meta_title: data.blog_meta_title,
            blog_meta_desc: data.blog_meta_desc,
            blog_meta_keyword: data.blog_meta_keyword,
            blog_status: 0,
            blog_createdAt: currentUnixTimeStamp(),
            blog_updatedAt: currentUnixTimeStamp(),
        }

        const blogThumbnail = saveBase64File(
            data.blog_thumbnail,
            "blog",
            "thumbnails",
        );

        insertData.blog_thumbnail = blogThumbnail;

        const result = await dbConfig.query(
            `INSERT INTO blog SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Blog added successfully",
            jsonData: {}
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// FETCH BLOG DETAILS SERVICE
export const getBlogDetailsService = async (blog_id: number) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT * FROM blog WHERE blog_id = ?`,
            [blog_id]
        );

        if (rows.length === 0) {
            return {
                status: 404,
                message: "Blog not found",
                jsonData: {}
            };
        }

        return {
            status: 200,
            message: "Blog details fetched successfully",
            jsonData: {
                blog_details: rows[0]
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// UPDATE BLOG SERVICE
export const updateBlogService = async (blog_id: number, data: any) => {
    try {
        const updateData: any = {}

        if (data.blog_category_id) updateData.blog_category_id = data.blog_category_id;
        if (data.blog_title) updateData.blog_title = data.blog_title;
        if (data.blog_title_sku) updateData.blog_title_sku = data.blog_title_sku;
        if (data.blog_short_desc) updateData.blog_short_desc = data.blog_short_desc;
        if (data.blog_long_desc) updateData.blog_long_desc = data.blog_long_desc;
        if (data.blog_tags) updateData.blog_tags = data.blog_tags;
        if (data.blog_meta_title) updateData.blog_meta_title = data.blog_meta_title;
        if (data.blog_meta_desc) updateData.blog_meta_desc = data.blog_meta_desc;
        if (data.blog_meta_keyword) updateData.blog_meta_keyword = data.blog_meta_keyword;
        if (data.blog_thumbnail) updateData.blog_thumbnail = null;
        updateData.blog_updatedAt = currentUnixTimeStamp();

        const blogThumbnail = saveBase64File(
            data.blog_thumbnail,
            "blog",
            "thumbnails",
        );

        if (blogThumbnail) {
            updateData.blog_thumbnail = blogThumbnail;
        }

        const result = await dbConfig.query(
            `UPDATE blog SET ? WHERE blog_id = ?`,
            [updateData, blog_id]
        );

        return {
            status: 200,
            message: "Blog updated successfully",
            jsonData: {}
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// UPDATE BLOG STATUS SERVICE
export const updateBlogStatusService = async (blog_id: number, status: number) => {
    try {
        console.log("Updating blog status - blog_id:", blog_id, "status:", status);
        const [result]: any = await dbConfig.query(
            `UPDATE blog SET blog_status = ? WHERE blog_id = ?`,
            [status, blog_id]
        );

        return {
            status: 200,
            message: "Blog status updated successfully",
            jsonData: {}
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};

// GET BLOG LIST FOR WEBSITE SERVICE
export const getBlogListForWebsiteService = async (filters?: {
    date?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    limit?: number;
    search?: string;
    category_level1_id?: number;
}) => {
    try {
        const page = filters?.page && filters.page > 0 ? filters.page : 1;
        const limit = filters?.limit && filters.limit > 0 ? filters.limit : 12;
        const offset = (page - 1) * limit;

        const searchTerm = filters?.search ? `%${filters.search}%` : null;

        const { whereSQL, params } = buildFilters({
            ...filters,
            dateColumn: "blog.blog_createdAt",
        });

        let finalWhereSQL = whereSQL;

        // For website, we only want active blogs
        const websiteStatusCondition = "blog.blog_status = 0";
        if (/where\s+/i.test(finalWhereSQL)) {
            finalWhereSQL += ` AND ${websiteStatusCondition}`;
        } else {
            finalWhereSQL = `WHERE ${websiteStatusCondition}`;
        }

        if (filters?.category_level1_id) {
            finalWhereSQL += ` AND blog.blog_category_id = ?`;
            params.push(filters.category_level1_id);
        }

        if (searchTerm) {
            const searchCondition = `blog.blog_title LIKE ? OR blog.blog_short_desc LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm);
        }

        const query = `
            SELECT 
                blog.blog_id,
                blog.blog_title,
                blog.blog_short_desc,
                blog.blog_thumbnail,
                blog.blog_createdAt,
                category_level_1.category_level1_name
            FROM blog
            LEFT JOIN category_level_1 ON blog.blog_category_id = category_level_1.category_level1_id
            ${finalWhereSQL}
            ORDER BY blog.blog_id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, limit, offset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        const [countRows]: any = await dbConfig.query(
            `SELECT COUNT(*) as total FROM blog ${finalWhereSQL}`,
            params
        );
        const total = countRows[0]?.total || 0;

        return {
            status: 200,
            message: "Blog list for website fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                blog_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error" + error,
            jsonData: {}
        }
    }
};