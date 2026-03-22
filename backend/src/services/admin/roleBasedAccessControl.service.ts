import db_Config from "../../config/db_Config";
import { saveBase64File } from "../../middleware/base64FileUpload";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";
import { buildFilters } from "../../utils/filters";

//----------------------------------------------ROLE SERVICES----------------------------------------------//

// ROLE LIST
export const getRoleListService = async (filters?: {
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
            dateColumn: "admin_role.created_at",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "admin_role.role_status = 0",
                inactive: "admin_role.role_status = 1",
            };

            const statusCondition = statusConditionMap[filters.status];

            if (statusCondition) {
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${statusCondition}`;
                } else {
                    finalWhereSQL += ` WHERE ${statusCondition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `admin_role.role_name LIKE ? OR admin_role.role_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += `AND ${searchCondition}`;
            } else {
                finalWhereSQL += `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm);
        }

        const isDateFilterApplied = filters?.date || (filters?.fromDate && filters?.toDate);
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFilterApplied = !isDateFilterApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        if (noFilterApplied) {
            effectiveLimit = limit;
            effectiveLimit = (page - 1) * limit;
        }

        const query = `
            SELECT * FROM admin_role
            ${finalWhereSQL}
            ORDER BY admin_role.role_createdAt DESC
            LIMIT ? OFFSET ?
        `

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await db_Config.query(query, queryParams);

        let total;

        if (noFilterApplied) {
            const [countAllRows]: any = await db_Config.query(`SELECT COUNT(*) as total FROM admin_role`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }
        } else {
            const [countAllRows]: any = await db_Config.query(`SELECT COUNT(*) as total FROM admin_role ${finalWhereSQL}`, params);
            total = countAllRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Role List fetched successfully.",
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                role_list: rows,
            }
        };

    } catch (error) {
        console.error("Error in getRoleListService:", error);
        return {
            status: 500,
            message: "An error occurred while fetching the role list.",
            jsonData: {},
        };
    }
};

// ADD ROLE
export const addRoleService = async (data: any) => {
    try {
        const insertData = {
            role_name: data.role_name,
            role_status: 0,
            role_createdAt: currentUnixTimeStamp(),
        }

        const [result]: any = await db_Config.query(`INSERT INTO admin_role SET ?`, [insertData]);

        return {
            status: 200,
            message: "Role added successfully.",
            jsonData: { role_id: result.insertId },
        };
    } catch (error) {
        console.error("Error in addRoleService:", error);
        return {
            status: 500,
            message: "An error occurred while adding the role.",
            jsonData: {},
        };
    }
};

// FETCH ROLE DETAIL SERVICE
export const fetchRoleDetailsService = async (role_id: number) => {
    try {
        const [rows]: any = await db_Config.query(`SELECT * FROM admin_role WHERE role_id = ?`, [role_id]);

        if (rows.length === 0) {
            return {
                status: 404,
                message: "Role not found.",
                jsonData: {},
            };
        }

        return {
            status: 200,
            message: "Role detail fetched successfully.",
            jsonData: { role_details: rows[0] },
        };
    } catch (error) {
        console.error("Error in fetchRoleDetailsService:", error);
        return {
            status: 500,
            message: "An error occurred while fetching the role detail.",
            jsonData: {},
        };
    }
};

// UPDATE ROLE SERVICE
export const updateRoleService = async (data: any, role_id: number) => {
    try {
        const updateData: any = {};

        if (data.role_name) updateData.role_name = data.role_name;
        if (data.role_name) updateData.role_createdAt = currentUnixTimeStamp();

        const [result]: any = await db_Config.query(`UPDATE admin_role SET ? WHERE role_id = ?`, [updateData, role_id]);

        if (result.affectedRows === 0) {
            return {
                status: 404,
                message: "Role not found.",
                jsonData: {},
            };
        }

        return {
            status: 200,
            message: "Role updated successfully.",
            jsonData: {},
        };
    } catch (error) {
        console.error("Error in updateRoleService:", error);
        return {
            status: 500,
            message: "An error occurred while updating the role.",
            jsonData: {},
        };

    }
};

// UPDATE ROLE STATUS SERVICE
export const updateRoleStatusService = async (role_id: number, status: number) => {
    try {
        const [result]: any = await db_Config.query(`UPDATE admin_role SET role_status = ? WHERE role_id = ?`, [status, role_id]);
        if (result.affectedRows === 0) {
            return {
                status: 404,
                message: "Role not found.",
                jsonData: {},
            };
        }
        return {
            status: 200,
            message: "Role status updated successfully.",
            jsonData: {},
        };
    } catch (error) {
        console.error("Error in updateRoleStatusService:", error);
        return {
            status: 500,
            message: "An error occurred while updating the role status.",
            jsonData: {},
        };
    }
};



//----------------------------------------------MODULES SERVICES----------------------------------------------//

// GET MODULES SERVICE
export const getModuleListService = async (filters?: {
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
            dateColumn: "admin_module.module_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "admin_module.module_status = 0",
                inactive: "admin_module.module_status = 1",
            };

            const statusCondition = statusConditionMap[filters.status];

            if (statusCondition) {
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${statusCondition}`;
                } else {
                    finalWhereSQL += ` WHERE ${statusCondition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `admin_module.module_name LIKE ? OR admin_module.module_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += `AND ${searchCondition}`;
            } else {
                finalWhereSQL += `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm);
        }

        const isDateFilterApplied = filters?.date || (filters?.fromDate && filters?.toDate);
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFilterApplied = !isDateFilterApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        if (noFilterApplied) {
            effectiveLimit = limit;
            effectiveLimit = (page - 1) * limit;
        }

        const query = `
            SELECT * FROM admin_module
            ${finalWhereSQL}
            ORDER BY admin_module.module_createdAt DESC
            LIMIT ? OFFSET ?
        `

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await db_Config.query(query, queryParams);

        let total;

        if (noFilterApplied) {
            const [countAllRows]: any = await db_Config.query(`SELECT COUNT(*) as total FROM admin_module`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }
        } else {
            const [countAllRows]: any = await db_Config.query(`SELECT COUNT(*) as total FROM admin_module ${finalWhereSQL}`, params);
            total = countAllRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Module List fetched successfully.",
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                module_list: rows,
            }
        };

    } catch (error) {
        console.error("Error in getModuleListService:", error);
        return {
            status: 500,
            message: "An error occurred while fetching the module list.",
            jsonData: {},
        };
    }
};

// ADD MODULE SERVICE
export const addModuleService = async (data: any) => {
    try {
        const insertData = {
            module_name: data.module_name,
            module_icon: '',
            module_page_url: data.module_page_url,
            module_order_priority: data.module_order_priority,
            module_status: 0,
            module_createdAt: currentUnixTimeStamp(),
        }

        const moduleImage = saveBase64File(
            data.module_icon,
            'modules',
            `module_icon`
        );

        insertData.module_icon = moduleImage;

        const [result]: any = await db_Config.query(`INSERT INTO admin_module SET ?`, [insertData]);

        return {
            status: 200,
            message: "Module added successfully.",
            jsonData: { module_id: result.insertId },
        };

    } catch (error) {
        console.error("Error in addModuleService:", error);
        return {
            status: 500,
            message: "An error occurred while adding the module.",
            jsonData: {},
        };
            
    }
};

// FETCH MODULE DETAIL SERVICE
export const fetchModuleDetailsService = async (module_id: number) => {
    try {
        const [rows]: any = await db_Config.query(`SELECT * FROM admin_module WHERE module_id = ?`, [module_id]);

        if (rows.length === 0) {
            return {
                status: 404,
                message: "Module not found.",
                jsonData: {},
            };
        }

        return {
            status: 200,
            message: "Module detail fetched successfully.",
            jsonData: { module_details: rows[0] },
        };
    } catch (error) {
        console.error("Error in fetchModuleDetailsService:", error);
        return {
            status: 500,
            message: "An error occurred while fetching the module detail.",
            jsonData: {},
        };
    }
};

// UPDATE MODULE SERVICE
export const updateModuleService = async (data: any, module_id: number) => {
    try {
        const updateData: any = {};

        if (data.module_name) updateData.module_name = data.module_name;
        if (data.module_page_url) updateData.module_page_url = data.module_page_url;
        if (data.module_order_priority) updateData.module_order_priority = data.module_order_priority;
        if (data.module_icon) {
            const moduleImage = saveBase64File(
                data.module_icon,
                'modules',
                `module_icon`
            );
            updateData.module_icon = moduleImage;
        }
        if (data.module_name || data.module_page_url || data.module_order_priority || data.module_icon) {
            updateData.module_createdAt = currentUnixTimeStamp();
        }

        const [result]: any = await db_Config.query(`UPDATE admin_module SET ? WHERE module_id = ?`, [updateData, module_id]);

        if (result.affectedRows === 0) {
            return {
                status: 404,
                message: "Module not found.",
                jsonData: {},
            };
        }

        return {
            status: 200,
            message: "Module updated successfully.",
            jsonData: {},
        };

    } catch (error) {
            console.error("Error in updateModuleService:", error);
            return {
                status: 500,
                message: "An error occurred while updating the module.",
                jsonData: {},
            };
        }
};

// UPDATE MODULE STATUS SERVICE
export const updateModuleStatusService = async (module_id: number, status: number) => {
    try {
        const [result]: any = await db_Config.query(`UPDATE admin_module SET module_status = ? WHERE module_id = ?`, [status, module_id]);
        if (result.affectedRows === 0) {
            return {
                status: 404,
                message: "Module not found.",
                jsonData: {},
            };
        }

        return {
            status: 200,
            message: "Module status updated successfully.",
            jsonData: {},
        };

    } catch (error) {
        console.error("Error in updateModuleStatusService:", error);
        return {
            status: 500,
            message: "An error occurred while updating the module status.",
            jsonData: {},
        };
    }
};