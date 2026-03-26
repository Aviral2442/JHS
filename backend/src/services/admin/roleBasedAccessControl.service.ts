import  dbConfig  from "../../config/db_Config";
import { saveBase64File } from "../../middleware/base64FileUpload";
import { ApiError } from "../../utils/ApiError";
import { currentUnixTimeStamp } from "../../utils/CurrentUnixTimeStamp";
import { buildFilters } from "../../utils/filters";

// ROLE LIST 
export const roleListService = async (filters?: {
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
                block: "admin_role.role_status = 2",
            };

            const condition = statusConditionMap[filters.status];

            if (condition) {
                // If there’s already WHERE (from date filters), just add AND
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${condition}`;
                } else {
                    finalWhereSQL = `WHERE ${condition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `admin_role.role_name LIKE ? OR admin_role.role_description LIKE ? OR admin_role.role_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += `AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm, searchTerm);
        }

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
            SELECT *
            FROM admin_role
            ${finalWhereSQL}
            ORDER BY admin_role.role_id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFiltersApplied) {
            // determine actual total count and cap at 100 when no filters applied
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM admin_role`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }

        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM admin_role ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Roles list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                roles_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Get Roles Error On Fetching");
    }

};

// ADD ROLE
export const addRoleService = async (data: any) => {
    try {

        const insertData = {
            role_name: data.role_name,
            role_description: data.role_description,
            role_status: data.role_status,
            created_at: currentUnixTimeStamp(),
        }

        const [addRole]: any = await dbConfig.query(
            `
            INSERT INTO admin_role SET ?
            `,
            [insertData]
        );

        if (addRole.affectedRows === 0) {
            throw new ApiError(400, "Failed to add role");
        }

        return {
            status: 200,
            message: "Role added successfully",
            jsonData: {
                role_id: addRole.insertId
            }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to add role");
    }
};

// GET ROLE DETAILS
export const getRoleDetailsService = async (roleId: number) => {
    try {
        const [roleDetails]: any = await dbConfig.query(
            `
            SELECT *
            FROM admin_role
            WHERE role_id = ?
            `,
            [roleId]
        );

        if (roleDetails.length === 0) {
            throw new ApiError(404, "Role not found");
        }

        return {
            status: 200,
            message: "Role details retrieved successfully",
            jsonData: {
                role_details: roleDetails[0]
            }
        };
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Failed to retrieve role details");
    }
};

// UPDATE ROLE
export const updateRoleService = async (data: any, roleId: number) => {
    try {
        const updateData: any = {};

        if (data.role_name) updateData.role_name = data.role_name;
        if (data.role_description) updateData.role_description = data.role_description;
        if (data.role_status) updateData.role_status = data.role_status;

        const [updateRole]: any = await dbConfig.query(
            `
            UPDATE admin_role SET ? WHERE role_id = ?`,
            [updateData, roleId]
        );

        if (updateRole.affectedRows === 0) {
            throw new ApiError(400, "Failed to update role");
        }

        return {
            status: 200,
            message: "Role updated successfully",
            jsonData: { role_id: roleId }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to update role");
    }
};

// UPDATE ROLE STATUS SERVICE
export const updateRoleStatusService = async (roleId: number, newStatus: number) => {
    try {
        const [updateStatus]: any = await dbConfig.query(
            `
            UPDATE admin_role SET role_status = ? WHERE role_id = ?`,
            [newStatus, roleId]
        );

        if (updateStatus.affectedRows === 0) {
            throw new ApiError(400, "Failed to update role status");
        }

        return {
            status: 200,
            message: "Role status updated successfully",
            jsonData: { role_id: roleId, new_status: newStatus }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to update role status");
    }
};

// ADMIN USER LIST
export const getAdminListService = async (filters?: {
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
            dateColumn: "admin.admin_createdAt",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "admin.admin_status = 0",
                inactive: "admin.admin_status = 1",
                block: "admin.admin_status = 2",
            };

            const condition = statusConditionMap[filters.status];

            if (condition) {
                // If there’s already WHERE (from date filters), just add AND
                if (/where\s+/i.test(finalWhereSQL)) {
                    finalWhereSQL += ` AND ${condition}`;
                } else {
                    finalWhereSQL = `WHERE ${condition}`;
                }
            }
        }

        if (searchTerm) {
            const searchCondition = `admin.admin_name LIKE ? OR admin.admin_email LIKE ? OR admin.admin_id LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += `AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
            params.push(searchTerm, searchTerm, searchTerm);
        }

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
            SELECT *, admin_roles.role_name
            FROM admin
            LEFT JOIN admin_roles ON admin.role_id = admin_roles.role_id
            ${finalWhereSQL}
            ORDER BY admin.id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;

        if (noFiltersApplied) {
            // determine actual total count and cap at 100 when no filters applied
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM admin`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }

        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM admin ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Admins list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                admins_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Get Admins Error On Fetching");
    }

};

// ADD ADMIN USER SERVICE
export const addAdminUserService = async (data: any) => {
    try {

        const insertData = {
            admin_profile: ' ',
            role_id: data.role_id,
            admin_name: data.admin_name,
            admin_email: data.admin_email,
            admin_mobile_no: data.admin_mobile_no,
            admin_password: data.admin_password,
            admin_status: data.admin_status,
            admin_createdAt: currentUnixTimeStamp(),
        }

        if (data.admin_profile) {
            insertData.admin_profile = saveBase64File(
                data.admin_profile,
                'admin_profiles',
                `admin`
            )
        }

        const [addAdmin]: any = await dbConfig.query(
            `
            INSERT INTO admin SET ?
            `,
            [insertData]
        );

        if (addAdmin.affectedRows === 0) {
            throw new ApiError(400, "Failed to add admin user");
        }

        return {
            status: 200,
            message: "Admin user added successfully",
            jsonData: {
                admin_id: addAdmin.insertId
            }
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to add admin user");
    }
};

// GET ADMIN DETAILS SERVICE
export const getAdminDetailsService = async (adminId: number) => {
    try {
        const [adminDetails]: any = await dbConfig.query(
            `
            SELECT *, admin_roles.role_name
            FROM admin
            LEFT JOIN admin_roles ON admin.role_id = admin_roles.role_id
            WHERE admin.id = ?
            `,
            [adminId]
        );


        if (adminDetails.length === 0) {
            throw new ApiError(404, "Admin user not found");
        }

        return {
            status: 200,
            message: "Admin user details retrieved successfully",
            jsonData: {
                admin_details: adminDetails[0]
            }
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to retrieve admin details");
    }
};

// UPDATE ADMIN SERVICE
export const updateAdminService = async (data: any, adminId: number) => {
    try {
        const updateData: any = {};

        if (data.admin_name) updateData.admin_name = data.admin_name;
        if (data.admin_email) updateData.admin_email = data.admin_email;
        if (data.admin_mobile_no) updateData.admin_mobile_no = data.admin_mobile_no;
        if (data.admin_password) updateData.admin_password = data.admin_password;
        if (data.role_id) updateData.role_id = data.role_id;
        if (data.admin_status !== undefined) updateData.admin_status = data.admin_status;
        if (data.admin_profile) updateData.admin_profile = saveBase64File(
            data.admin_profile,
            'admin_profiles',
            `admin`
        );
        updateData.admin_createdAt = currentUnixTimeStamp();

        const [updateAdmin]: any = await dbConfig.query(
            `
            UPDATE admin SET ? WHERE admin_id = ?`,
            [updateData, adminId]
        );

        if (updateAdmin.affectedRows === 0) {
            throw new ApiError(400, "Failed to update admin user");
        }

        return {
            status: 200,
            message: "Admin user updated successfully",
            jsonData: { admin_id: adminId }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to update admin user");
    }
};

// UPDATE ADMIN STATUS SERVICE
export const updateAdminStatusService = async (adminId: number, newStatus: number) => {
    try {
        const [updateStatus]: any = await dbConfig.query(
            `
            UPDATE admin SET admin_status = ? WHERE admin_id = ?`,
            [newStatus, adminId]
        );
        if (updateStatus.affectedRows === 0) {
            throw new ApiError(400, "Failed to update admin user status");
        }

        return {
            status: 200,
            message: "Admin user status updated successfully",
            jsonData: { admin_id: adminId, new_status: newStatus }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to update admin user status");
    }
};

// GET MODULES LIST SERVICE
export const getModulesListService = async (filters?: {
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
            dateColumn: "created_at",
        });

        let finalWhereSQL = whereSQL;

        if (filters?.status) {
            const statusConditionMap: Record<string, string> = {
                active: "status = 0",
                inactive: "status = 1",
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
            const searchCondition = `module_name LIKE ? OR module_route LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += `AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
        }

        const isDateFilterApplied = !!filters?.date || !!filters?.fromDate || !!filters?.toDate;
        const isStatusFilterApplied = !!filters?.status;
        const isSearchFilterApplied = !!filters?.search;
        const noFiltersApplied = !isDateFilterApplied && !isStatusFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        if (noFiltersApplied) {
            effectiveLimit = limit;              // per page limit (e.g., 10)
            effectiveOffset = (page - 1) * limit; // correct pagination
        }

        const query = `
            SELECT *
            FROM admin_modules
            ${whereSQL}
            ORDER BY module_id ASC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;
        if (noFiltersApplied) {
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM admin_modules`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }
        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM admin_modules ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Modules list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                modules_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Get Modules Error On Fetching");
    }

};

// ADD MODULE CONTROLLER
export const addModuleService = async (data: any) => {
    try {

        const insertData = {
            module_name: data.module_name,
            module_icon: data.module_icon,
            module_route: data.module_route,
            status: data.status,
            created_at: currentUnixTimeStamp(),
            updated_at: currentUnixTimeStamp(),
        }

        const [result]: any = await dbConfig.query(
            `
            INSERT INTO admin_modules SET ?
            `,
            [insertData]
        );

        if (result.affectedRows === 0) {
            throw new ApiError(400, "Failed to add module");
        }

        return {
            status: 200,
            message: "Module added successfully",
            jsonData: {
                module_id: result.insertId
            }
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to add module");
    }
};

// FETCH MODULE DETAILS SERVICE
export const getModuleDetailsService = async (moduleId: number) => {
    try {
        const [moduleDetails]: any = await dbConfig.query(
            `
            SELECT *
            FROM admin_modules
            WHERE module_id = ?
            `,
            [moduleId]
        );

        if (moduleDetails.length === 0) {
            throw new ApiError(404, "Module not found");
        }

        return {
            status: 200,
            message: "Module details retrieved successfully",
            jsonData: {
                module_details: moduleDetails[0]
            }
        };
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Failed to retrieve module details");
    }
};

// UPDATE MODULE SERVICE
export const updateModuleService = async (data: any, moduleId: number) => {
    try {
        const updateData: any = {};

        if (data.module_name) updateData.module_name = data.module_name;
        if (data.module_route) updateData.module_route = data.module_route;
        if (data.module_icon) updateData.module_icon = data.module_icon;
        if (data.status !== undefined) updateData.status = data.status;
        if (data.module_name) updateData.updated_at = currentUnixTimeStamp();


        const [result]: any = await dbConfig.query(
            `
            UPDATE admin_modules SET ? WHERE module_id = ?`,
            [updateData, moduleId]
        );

        if (result.affectedRows === 0) {
            throw new ApiError(400, "Failed to update module");
        }

        return {
            status: 200,
            message: "Module updated successfully",
            jsonData: { module_id: moduleId }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to update module");
    }
};

// UPDATE MODULE STATUS SERVICE
export const updateModuleStatusService = async (moduleId: number, newStatus: number) => {
    try {
        const [updateStatus]: any = await dbConfig.query(
            `
            UPDATE admin_modules SET status = ?, updated_at = ? WHERE module_id = ?`,
            [newStatus, currentUnixTimeStamp(), moduleId]
        );

        if (updateStatus.affectedRows === 0) {
            throw new ApiError(400, "Failed to update module status");
        }

        return {
            status: 200,
            message: "Module status updated successfully",
            jsonData: { module_id: moduleId, new_status: newStatus }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to update module status");
    }
};



//------------------------------------------------------OPERATIONS SERVICES------------------------------------------------------//

// GET OPERATIONS LIST SERVICE
export const getOperationsListService = async (filters?: {
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
            dateColumn: "admin_operations.created_at",
        });

        let finalWhereSQL = whereSQL;

        if (searchTerm) {
            const searchCondition = `admin_operations.module_name LIKE ? OR admin_operations.module_route LIKE ?`;
            if (/where\s+/i.test(finalWhereSQL)) {
                finalWhereSQL += `AND (${searchCondition})`;
            } else {
                finalWhereSQL = `WHERE ${searchCondition}`;
            }
        }

        const isDateFilterApplied = !!filters?.date || !!filters?.fromDate || !!filters?.toDate;
        const isSearchFilterApplied = !!filters?.search;
        const noFiltersApplied = !isDateFilterApplied && !isSearchFilterApplied;

        let effectiveLimit = limit;
        let effectiveOffset = offset;

        if (noFiltersApplied) {
            effectiveLimit = limit;              // per page limit (e.g., 10)
            effectiveOffset = (page - 1) * limit; // correct pagination
        }

        const query = `
            SELECT *, admin_modules.module_name
            FROM admin_operations
            LEFT JOIN admin_modules ON admin_operations.module_id = admin_modules.module_id
            ${whereSQL}
            ORDER BY operation_id DESC
            LIMIT ? OFFSET ?
        `;

        const queryParams = [...params, effectiveLimit, effectiveOffset];
        const [rows]: any = await dbConfig.query(query, queryParams);

        let total;
        if (noFiltersApplied) {
            const [countAllRows]: any = await dbConfig.query(`SELECT COUNT(*) as total FROM admin_operations`);
            const actualTotal = countAllRows[0]?.total || 0;

            if (actualTotal < 100) {
                total = actualTotal;
            } else {
                total = 100;
            }
        } else {
            const [countRows]: any = await dbConfig.query(
                `SELECT COUNT(*) as total FROM admin_operations ${finalWhereSQL}`,
                params
            );
            total = countRows[0]?.total || 0;
        }

        return {
            status: 200,
            message: "Operations list fetched successfully",
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            jsonData: {
                operations_list: rows
            },
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Get Operations Error On Fetching");
    }

};

// ADD OPERATION SERVICE
export const addOperationService = async (data: any) => {
    try {
        const insertData = {
            module_id: data.module_id,
            operation_name: data.operation_name,
            operation_slug: data.operation_slug,
            created_at: currentUnixTimeStamp(),
            updated_at: currentUnixTimeStamp(),
        }

        const [result]: any = await dbConfig.query(
            `
            INSERT INTO admin_operations SET ?
            `,
            [insertData]
        );

        if (result.affectedRows === 0) {
            throw new ApiError(400, "Failed to add operation");
        }

        const [roleIdArray]: any = await dbConfig.query(
            `
            SELECT role_id FROM admin_roles
            `
        );

        const permissionsInsertData = roleIdArray.map((role: any) => {
            return {
                role_id: role.role_id,
                module_id: data.module_id,
                operation_id: result.insertId
            };
        });

        const [addPermission]: any = await dbConfig.query(
            `
            INSERT INTO admin_permissions (role_id, module_id, operation_id, created_at) VALUES ?
            `,
            [permissionsInsertData.map((data: any) => [data.role_id, data.module_id, data.operation_id, currentUnixTimeStamp()])]
        );

        if (addPermission.affectedRows === 0) {
            throw new ApiError(400, "Failed to add permissions for the new operation");
        }

        return {
            status: 200,
            message: "Operation added successfully",
            jsonData: {
                operation_id: result.insertId
            }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to add operation");
    }
};

// FETCH OPERATION DETAILS SERVICE
export const getOperationDetailsService = async (operationId: number) => {
    try {
        const [operationDetails]: any = await dbConfig.query(
            `
            SELECT *
            FROM admin_operations
            WHERE operation_id = ?
            `,
            [operationId]
        );

        if (operationDetails.length === 0) {
            throw new ApiError(404, "Operation not found");
        }

        return {
            status: 200,
            message: "Operation details retrieved successfully",
            jsonData: {
                operation_details: operationDetails[0]
            }
        };
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Failed to retrieve operation details");
    }
};

// UPDATE OPERATION SERVICE 
export const updateOperationService = async (data: any, operationId: number) => {
    try {
        const updateData: any = {};

        if (data.module_id) updateData.module_id = data.module_id;
        if (data.operation_name) updateData.operation_name = data.operation_name;
        if (data.operation_slug) updateData.operation_slug = data.operation_slug;
        if (data.updated_by) updateData.updated_by = currentUnixTimeStamp();

        const [result]: any = await dbConfig.query(
            `
            UPDATE admin_operations SET ? WHERE operation_id = ?`,
            [updateData, operationId]
        );

        if (result.affectedRows === 0) {
            throw new ApiError(400, "Failed to update operation");
        }

        return {
            status: 200,
            message: "Operation updated successfully",
            jsonData: { operation_id: operationId }
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to update operation");
    }
};

// FETCH ALL MODULES AND OPERATIONS SERVICE
export const fetchAllModuleAndOperationsService = async (roleId: number) => {
    try {

        const [allPermissionData]: any = await dbConfig.query(
            `
            SELECT *
            FROM admin_permissions
            LEFT JOIN admin_modules ON admin_permissions.module_id = admin_modules.module_id
            LEFT JOIN admin_operations ON admin_permissions.operation_id = admin_operations.operation_id
            WHERE admin_permissions.role_id = ?
            `,
            [roleId]
        );

        return {
            status: 200,
            message: "Modules and operations fetched successfully",
            jsonData: {
                modules_and_operations: allPermissionData
            }
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to fetch modules and operations");
    }
};

// UPDATE PERMISSIONS SERVICE
export const updatePermissionsService = async (roleId: number, data: any) => {
    try {

        const updateData: any = {};

        if (data.role_id !== undefined) updateData.role_id = data.role_id;
        if (data.module_id !== undefined) updateData.module_id = data.module_id;
        if (data.operation_id !== undefined) updateData.operation_id = data.operation_id;
        if (data.is_add !== undefined) updateData.is_add = data.is_add;
        if (data.is_edit !== undefined) updateData.is_edit = data.is_edit;
        if (data.is_view !== undefined) updateData.is_view = data.is_view;
        if (data.is_delete !== undefined) updateData.is_delete = data.is_delete;
        if (data.is_view_remark !== undefined) updateData.is_view_remark = data.is_view_remark;
        if (data.is_add_remark !== undefined) updateData.is_add_remark = data.is_add_remark;
        if (data.is_edit_remark !== undefined) updateData.is_edit_remark = data.is_edit_remark;
        if (data.is_active !== undefined) updateData.is_active = data.is_active;
        if (data.is_inactive !== undefined) updateData.is_inactive = data.is_inactive;
        if (data.is_export !== undefined) updateData.is_export = data.is_export;

        const [result]: any = await dbConfig.query(
            `
            UPDATE admin_permissions SET ? WHERE role_id = ? AND module_id = ? AND operation_id = ?`,
            [updateData, roleId, data.module_id, data.operation_id]
        );

        if (result.affectedRows === 0) {
            throw new ApiError(400, "Failed to update permissions");
        }

        return {
            status: 200,
            message: "Permissions updated successfully",
            jsonData: { role_id: roleId, module_id: data.module_id, operation_id: data.operation_id }
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to update permissions");
    }
};

// FETCH DATA FOR SIDEBAR SERVICE
export const fetchDataForSideBarService = async (roleId: number) => {
    try {

        const [sideBarData]: any = await dbConfig.query(
            ` SELECT 
                 m.module_id,
                 m.module_name,
                 m.module_icon,
                 m.module_route,

                 o.operation_id,
                 o.operation_name,
                 o.operation_slug

            FROM admin_modules m
            LEFT JOIN admin_operations o 
              ON o.module_id = m.module_id

            LEFT JOIN admin_permission p 
              ON p.operation_id = o.operation_id 
              AND p.role_id = ?

            WHERE 
              m.status = 0
              AND p.is_view = 0

            ORDER BY 
              m.module_order_priority ASC,
              o.operation_order_priority ASC
                  
            `, [roleId]
        )


        const modulesMap: any = {};

        sideBarData.forEach((row: any) => {
            if (!modulesMap[row.module_id]) {
                modulesMap[row.module_id] = {
                    module_id: row.module_id,
                    module_name: row.module_name,
                    module_icon: row.module_icon,
                    module_route: row.module_route,
                    operations: []
                };
            }

            if (row.operation_id) {
                modulesMap[row.module_id].operations.push({
                    operation_id: row.operation_id,
                    operation_name: row.operation_name,
                    operation_slug: row.operation_slug
                });
            }
        });

        return {
            status: 200,
            message: "Sidebar data fetched successfully",
            jsonData: {
                sidebar_data: Object.values(modulesMap)
            }
        };

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to fetch sidebar data");
    }
}