import dbConfig from "../../config/db_Config";
import { saveBase64File } from "../../middleware/base64FileUpload";
import { buildFilters } from "../../utils/filters";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";
import { generateToken } from "../../utils/jwt";


// GET CONSUMER LIST SERVICE
export const getConsumerListService = async (filters?: {
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
            dateColumn: "consumer.consumer_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "consumer.consumer_status = 0",
                inactive: "consumer.consumer_status = 1",
                block: "consumer.consumer_status = 2",
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
            const searchCondition = `consumer.consumer_full_name LIKE ? OR consumer.consumer_id LIKE ? OR consumer.consumer_mobile LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm, searchTerm);
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
                consumer.consumer_id,
                consumer.consumer_full_name,
                consumer.consumer_profile_pic,
                consumer.consumer_email,
                consumer.consumer_mobile,
                consumer.consumer_status,
                consumer.consumer_address,
                consumer.consumer_createdAt
            FROM consumer
            ${finalWhereSQL}
            ORDER BY consumer.consumer_createdAt DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFiltersApplied) {
            // determine actual total count and cap at 100 when no filters applied
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM consumer`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }

        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM consumer ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Consumer list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                consumer_list: rows
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

// SignUP CONSUMER SERVICE
export const addConsumerService = async (data: any) => {
    try {
        const insertData = {
            consumer_full_name: data.consumer_full_name,
            consumer_email: data.consumer_email,
            consumer_password: data.consumer_password,
            consumer_source: data.consumer_source,
            consumer_policy_agree_status: data.consumer_policy_agree_status,
            consumer_createdAt: currentUnixTimeStamp(),
        }

        // create referral code by combining name and random strin

        const [result]: any = await dbConfig.query(
            `INSERT INTO consumer SET ?`,
            [insertData]
        );

        const randomString = "JHS" + insertData.consumer_full_name.replace(/\s/g, '').substring(0, 3).toUpperCase() + result.insertId;

        await dbConfig.query(
            `UPDATE consumer SET consumer_referral_code = ? WHERE consumer_id = ?`,
            [randomString, result.insertId]
        );

        return {
            status: 200,
            message: "Consumer added successfully",
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

// FETCH CONSUMER DETAILS SERVICE
export const fetchConsumerDetailsService = async (consumerId: string) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT 
                consumer.*
            FROM consumer
            WHERE consumer.consumer_id = ?`,
            [consumerId]
        );
        return {
            status: 200,
            message: "Consumer details fetched successfully",
            jsonData: {
                consumer_details: rows[0]
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

// UPDATE CONSUMER DETAILS SERVICE
export const updateConsumerDetailsService = async (consumerId: string, data: any) => {
    try {
        const updateData: any = {}
        if (data.consumer_full_name) updateData.consumer_full_name = data.consumer_full_name;
        if (data.consumer_email) updateData.consumer_email = data.consumer_email;
        if (data.consumer_mobile) updateData.consumer_mobile = data.consumer_mobile;
        if (data.consumer_address) updateData.consumer_address = data.consumer_address;
        if (data.consumer_gender) updateData.consumer_gender = data.consumer_gender;
        if (data.consumer_profile_pic) updateData.consumer_profile_pic = " ";
        if (data.consumer_state_id) updateData.consumer_state_id = data.consumer_state_id;
        if (data.consumer_city_id) updateData.consumer_city_id = data.consumer_city_id;
        if (data.consumer_zipcode) updateData.consumer_zipcode = data.consumer_zipcode;
        if (data.consumer_referral_code) updateData.consumer_referral_code = data.consumer_referral_code;

        data.consumer_profile_pic = await saveBase64File(
            data.consumer_profile_pic,
            "consumer_profile_pics",
            "consumer_profile_pic_" + consumerId
        )

        const [result]: any = await dbConfig.query(
            `UPDATE consumer SET ? WHERE consumer_id = ?`,
            [updateData, consumerId]
        );

        return {
            status: 200,
            message: "Consumer details updated successfully",
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

// UPDATE CONSUMER STATUS SERVICE
export const updateConsumerStatusService = async (consumerId: string, status: number) => {
    try {
        const [result]: any = await dbConfig.query(
            `UPDATE consumer SET consumer_status = ? WHERE consumer_id = ?`,
            [status, consumerId]
        );

        return {
            status: 200,
            message: "Consumer status updated successfully",
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

// CONSUMER LOGIN SERVICE
export const consumerLoginService = async (email: string, password: string) => {
    try {
        const [rows]: any = await dbConfig.query(
            `SELECT 
                consumer_id,
                consumer_full_name,
                consumer_email,
                consumer_status
            FROM consumer
            WHERE consumer_email = ? AND consumer_password = ?`,
            [email, password]
        );

        if (rows.length === 0) {
            return {
                status: 401,
                message: "Invalid email or password",
                jsonData: {}
            };
        }

        const consumer = rows[0];

        if (consumer.consumer_status === 1) {
            return {
                status: 403,
                message: "Your account is inactive. Please contact support.",
                jsonData: {}
            };
        }

        if (consumer.consumer_status === 2) {
            return {
                status: 403,
                message: "Your account is blocked. Please contact support.",
                jsonData: {}
            };
        }

        // generate JWT token here (not implemented in this code snippet)
        const payload = {
            consumerId: consumer.consumer_id,
            name: consumer.consumer_full_name,
            email: consumer.consumer_email,
            profilePic: consumer.consumer_profile_pic,
        };

        const token = generateToken(payload);

        return {
            status: 200,
            message: "Login successful",
            data: {
                consumerId: consumer.consumer_id,
                consumerName: consumer.consumer_full_name,
                consumerEmail: consumer.consumer_email,
                consumerProfilePic: consumer.consumer_profile_pic,
            },
            token,
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