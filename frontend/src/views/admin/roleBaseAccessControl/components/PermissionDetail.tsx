import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

interface Permission {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
    addRemark: boolean;
    viewRemark: boolean;
    editRemark: boolean;
    active: boolean;
    inactive: boolean;
    export: boolean;
}

interface ModuleItem {
    id: string;
    moduleId: number;
    operationId: number;
    name: string;
    permissions: Permission;
}

interface Module {
    id: string;
    name: string;
    items: ModuleItem[];
}

interface PermissionApiRow {
    module_id: number;
    module_name: string;
    operation_id: number;
    operation_name: string;
    is_view: number;
    is_add: number;
    is_edit: number;
    is_delete: number;
    is_add_remark: number;
    is_view_remark: number;
    is_edit_remark: number;
    is_active: number;
    is_inactive: number;
    is_export: number;
}

const baseURL = (import.meta as any).env.VITE_URL || "";

const permissionKeyToApiField: Record<keyof Permission, keyof PermissionApiRow> = {
    view: "is_view",
    add: "is_add",
    edit: "is_edit",
    delete: "is_delete",
    addRemark: "is_add_remark",
    viewRemark: "is_view_remark",
    editRemark: "is_edit_remark",
    active: "is_active",
    inactive: "is_inactive",
    export: "is_export",
};

const defaultPerm = (): Permission => ({
    view: false,
    add: false,
    edit: false,
    delete: false,
    addRemark: false,
    viewRemark: false,
    editRemark: false,
    active: false,
    inactive: false,
    export: false,
});

const PermissionDetail: React.FC = () => {
    const { roleId } = useParams();
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(false);
    const [updatingKeys, setUpdatingKeys] = useState<Record<string, boolean>>({});

    const permissionHeaders = useMemo(() => Object.keys(defaultPerm()) as (keyof Permission)[], []);

    const mapApiRowsToModules = useCallback((rows: PermissionApiRow[]): Module[] => {
        const modulesMap = new Map<number, Module>();

        rows.forEach((row) => {
            if (!modulesMap.has(row.module_id)) {
                modulesMap.set(row.module_id, {
                    id: String(row.module_id),
                    name: row.module_name,
                    items: [],
                });
            }

            const targetModule = modulesMap.get(row.module_id);
            if (!targetModule) {
                return;
            }

            targetModule.items.push({
                id: `${row.module_id}-${row.operation_id}`,
                moduleId: row.module_id,
                operationId: row.operation_id,
                name: row.operation_name,
                permissions: {
                    view: row.is_view === 0,
                    add: row.is_add === 0,
                    edit: row.is_edit === 0,
                    delete: row.is_delete === 0,
                    addRemark: row.is_add_remark === 0,
                    viewRemark: row.is_view_remark === 0,
                    editRemark: row.is_edit_remark === 0,
                    active: row.is_active === 0,
                    inactive: row.is_inactive === 0,
                    export: row.is_export === 0,
                },
            });
        });

        return Array.from(modulesMap.values());
    }, []);

    const fetchPermissions = useCallback(async () => {
        if (!roleId) {
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(
                `${baseURL}/api/role-base-access-control/fetch_all_modules_and_operations/${roleId}`,
            );

            const rows = (res.data?.jsonData?.modules_and_operations || []) as PermissionApiRow[];
            console.log("Fetched Permissions Data:", rows);
            setModules(mapApiRowsToModules(rows));
        } catch (error) {
            console.error("Failed to fetch permissions:", error);
        } finally {
            setLoading(false);
        }
    }, [mapApiRowsToModules, roleId]);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    const togglePermission = async (
        moduleId: string,
        itemId: string,
        key: keyof Permission,
    ) => {
        if (!roleId) {
            return;
        }

        const currentModule = modules.find((mod) => mod.id === moduleId);
        const currentItem = currentModule?.items.find((item) => item.id === itemId);
        if (!currentItem) {
            return;
        }

        const previousValue = currentItem.permissions[key];
        const nextValue = !previousValue;
        const updatingKey = `${itemId}-${key}`;

        setUpdatingKeys((prev) => ({ ...prev, [updatingKey]: true }));

        setModules((prev) =>
            prev.map((mod) =>
                mod.id === moduleId
                    ? {
                        ...mod,
                        items: mod.items.map((item) =>
                            item.id === itemId
                                ? {
                                    ...item,
                                    permissions: {
                                        ...item.permissions,
                                        [key]: nextValue,
                                    },
                                }
                                : item,
                        ),
                    }
                    : mod,
            ),
        );

        try {
            await axios.put(
                `${baseURL}/api/role-base-access-control/update_permissions/${roleId}`,
                {
                    role_id: Number(roleId),
                    module_id: currentItem.moduleId,
                    operation_id: currentItem.operationId,
                    [permissionKeyToApiField[key]]: nextValue ? 0 : 1,
                },
            );
        } catch (error) {
            setModules((prev) =>
                prev.map((mod) =>
                    mod.id === moduleId
                        ? {
                            ...mod,
                            items: mod.items.map((item) =>
                                item.id === itemId
                                    ? {
                                        ...item,
                                        permissions: {
                                            ...item.permissions,
                                            [key]: previousValue,
                                        },
                                    }
                                    : item,
                            ),
                        }
                        : mod,
                ),
            );
            console.error("Failed to update permission:", error);
        } finally {
            setUpdatingKeys((prev) => {
                const next = { ...prev };
                delete next[updatingKey];
                return next;
            });
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="p-5 lg:p-6 space-y-5">
                {loading && (
                    <div className="text-sm text-gray-500 dark:text-gray-300">Loading permissions...</div>
                )}
                <div className="overflow-auto w-full">
                    <div className="min-w-250">
                        <table className="w-full border border-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="p-2 border">Module</th>
                                    <th className="p-2 border">Operation</th>
                                    {permissionHeaders.map((perm) => (
                                        <th key={perm} className="p-2 border capitalize">
                                            {perm}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {modules.map((module) => (
                                    <React.Fragment key={module.id}>
                                        <tr className="bg-gray-50 dark:bg-gray-600">
                                            <td
                                                className="p-2 border font-semibold"
                                                colSpan={12}
                                            >
                                                {module.name}
                                            </td>
                                        </tr>

                                        {module.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="p-2 border"></td>
                                                <td className="p-2 border">{item.name}</td>

                                                {Object.entries(item.permissions).map(
                                                    ([key, val]) => (
                                                        <td
                                                            key={key}
                                                            className="p-2 border text-center"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={val}
                                                                disabled={
                                                                    updatingKeys[
                                                                    `${item.id}-${key as keyof Permission}`
                                                                    ]
                                                                }
                                                                onChange={() =>
                                                                    togglePermission(
                                                                        module.id,
                                                                        item.id,
                                                                        key as keyof Permission
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionDetail;