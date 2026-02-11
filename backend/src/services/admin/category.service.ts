import dbConfig from "../../config/db_Config";
import { ApiError } from "../../utils/ApiError";
import { saveBase64File } from "../../middleware/base64FileUpload";
import { buildFilters } from "../../utils/filters";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";


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