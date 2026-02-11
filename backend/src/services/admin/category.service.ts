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
                category_level_2.*
            FROM category_level_2
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
                category_level_3.*
            FROM category_level_3
            ${finalWhereSQL}
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
