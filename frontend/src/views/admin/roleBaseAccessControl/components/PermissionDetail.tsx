import React, { useState } from "react";
import axios from "axios";

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
    name: string;
    permissions: Permission;
}

interface Module {
    id: string;
    name: string;
    items: ModuleItem[];
}

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

const initialData: Module[] = [
    {
        id: "dashboard",
        name: "Dashboard",
        items: [
            { id: "main", name: "Main Dashboard", permissions: defaultPerm() },
            { id: "search", name: "Search Data", permissions: defaultPerm() },
            { id: "stats", name: "Statistics", permissions: defaultPerm() },
        ],
    },
    {
        id: "partner",
        name: "Partner Section",
        items: [
            { id: "partner", name: "Partner", permissions: defaultPerm() },
            { id: "vehicle", name: "Vehicle", permissions: defaultPerm() },
            { id: "driver", name: "Driver", permissions: defaultPerm() },
        ],
    },
];

const PermissionDetail: React.FC = () => {
    const [modules, setModules] = useState<Module[]>(initialData);

    const togglePermission = (
        moduleId: string,
        itemId: string,
        key: keyof Permission
    ) => {
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
                                        [key]: !item.permissions[key],
                                    },
                                }
                                : item
                        ),
                    }
                    : mod
            )
        );
    };

    const handleSave = async () => {
        try {
            await axios.post("/api/save-permissions", { modules });
            alert("Permissions saved successfully");
        } catch (error) {
            console.error(error);
            alert("Error saving permissions");
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="p-5 lg:p-6 space-y-5">
                <div className="overflow-auto w-full">
                    <div className="min-w-[1000px]">
                        <table className="w-full border border-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="p-2 border">Module</th>
                                    <th className="p-2 border">Operation</th>
                                    {Object.keys(defaultPerm()).map((perm) => (
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

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Save Permissions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermissionDetail;