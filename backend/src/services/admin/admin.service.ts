import db_Config from "../../config/db_Config";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";
import { buildFilters } from "../../utils/filters";

// ADD REMARK SERVICE
export const addRemarkService = async (remarkData: any) => {
    try {

        const insertData = {
            remarks_type: remarkData.remarks_type,
            remarks_added_by: remarkData.remarks_added_by,
            remarks_text: remarkData.remarks_text,
            remarks_createdAt: currentUnixTimeStamp(),
        }

        const [result]: any = await db_Config.query(
            `INSERT INTO remarks SET ?`,
            [insertData]
        );

        return {
            status: 200,
            message: "Remark added successfully",
            jsonData: {
                remark_id: result.insertId
            }
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Internal Server Error",
            jsonData: {}
        }
    }
};

// GET CONTACT US LIST SERVICE
export const getContactUsListService = async (filters?: {
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
            dateColumn: "contact_form.contactForm_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "contact_form.contactForm_status = 0",
                inactive: "contact_form.contactForm_status = 1",
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
            const searchConditon = `contact_form.contactForm_name LIKE ? OR contact_form.contactForm_id LIKE ? OR contact_form.contactForm_mobile LIKE ? OR contact_form.contactForm_email LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += ` AND (${searchConditon})`;
            } else {
                finalWhereSQL += ` WHERE ${searchConditon}`;
            }
            params.push(searchTerm, searchTerm, searchTerm, searchTerm);
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
            SELECT * FROM contact_form
            ${finalWhereSQL}
            ORDER BY contact_form.contactForm_createdAt DESC
            LIMIT ? OFFSET ?
        `

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await db_Config.query(query, queryParams);

        let total;

        if (noFilterApplied) {
            const [countAllRows]: any = await db_Config.query(`SELECT COUNT(*) as total FROM contact_form`);
            const acturalTotal = countAllRows[0]?.total || 0;

            if (acturalTotal < 100) {
                total = acturalTotal;
            } else {
                total = 100;
            }
        } else {
            const [countAllRows]: any = await db_Config.query(`SELECT COUNT(*) as total FROM contact_form ${finalWhereSQL}`, params);
            total = countAllRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Contact us list fetched successfully.",
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                contact_form_list: rows,
            },
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "An error occurred while fetching the contact form list.",
            jsonData: {},
        }
    }
};