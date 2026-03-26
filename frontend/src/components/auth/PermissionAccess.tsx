import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";

export type PermissionAction =
  | "view"
  | "add"
  | "edit"
  | "delete"
  | "addRemark"
  | "viewRemark"
  | "editRemark"
  | "active"
  | "inactive"
  | "export";

type PermissionState = Record<PermissionAction, boolean>;

type PermissionApiRow = {
  module_route?: string;
  operation_slug?: string;
  is_view?: number;
  is_add?: number;
  is_edit?: number;
  is_delete?: number;
  is_add_remark?: number;
  is_view_remark?: number;
  is_edit_remark?: number;
  is_active?: number;
  is_inactive?: number;
  is_export?: number;
};

const baseURL = (import.meta as any).env.VITE_URL || "";

const denyAllPermissions: PermissionState = {
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
};

const permissionFieldMap: Record<PermissionAction, keyof PermissionApiRow> = {
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

const rolePermissionCache = new Map<number, PermissionApiRow[]>();

const normalizePath = (value: string) =>
  `/${value.replace(/\\/g, "/").replace(/^\/+/, "").replace(/\/+$/, "")}`;

const buildOperationPath = (row: PermissionApiRow) => {
  const moduleRoute = row.module_route ? normalizePath(row.module_route) : "";
  const operationSlug = row.operation_slug
    ? normalizePath(row.operation_slug)
    : "";

  if (!moduleRoute && !operationSlug) {
    return "";
  }

  const merged = `/admin${moduleRoute}${operationSlug}`;
  return normalizePath(merged);
};

const findRoutePermissionRow = (
  rows: PermissionApiRow[],
  pathname: string,
): PermissionApiRow | null => {
  const normalizedPathname = normalizePath(pathname);

  const candidates = rows
    .map((row) => ({ row, route: buildOperationPath(row) }))
    .filter(({ route }) => Boolean(route))
    .filter(
      ({ route }) =>
        normalizedPathname === route ||
        normalizedPathname.startsWith(`${route}/`),
    )
    .sort((a, b) => b.route.length - a.route.length);

  return candidates.length > 0 ? candidates[0].row : null;
};

const decodeRoleId = (token: string | null): number | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<{ roleId?: number }>(token);
    return decoded?.roleId ?? null;
  } catch (error) {
    console.error("Failed to decode token for permissions:", error);
    return null;
  }
};

export const usePagePermissions = () => {
  const location = useLocation();
  const [rows, setRows] = useState<PermissionApiRow[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("admin_token");
  const roleId = decodeRoleId(token);

  useEffect(() => {
    let isMounted = true;

    const fetchPermissions = async () => {
      if (!roleId) {
        setRows([]);
        return;
      }

      const cached = rolePermissionCache.get(roleId);
      if (cached) {
        setRows(cached);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}/api/role-base-access-control/fetch_all_modules_and_operations/${roleId}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          },
        );

        const nextRows =
          (response.data?.jsonData?.modules_and_operations as PermissionApiRow[]) ||
          [];

        rolePermissionCache.set(roleId, nextRows);
        if (isMounted) {
          setRows(nextRows);
        }
      } catch (error) {
        console.error("Failed to fetch role permissions:", error);
        if (isMounted) {
          setRows([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPermissions();

    return () => {
      isMounted = false;
    };
  }, [roleId, token]);

  const permissions = useMemo<PermissionState>(() => {
    const matchedRow = findRoutePermissionRow(rows, location.pathname);

    if (!matchedRow) {
      return denyAllPermissions;
    }

    return (Object.keys(permissionFieldMap) as PermissionAction[]).reduce(
      (acc, key) => {
        const field = permissionFieldMap[key];
        acc[key] = matchedRow[field] === 0;
        return acc;
      },
      { ...denyAllPermissions },
    );
  }, [location.pathname, rows]);

  return {
    loading,
    permissions,
    isAllowed: (action: PermissionAction) => permissions[action],
  };
};

type PermissionAccessProps = {
  action: PermissionAction;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

const PermissionAccess: React.FC<PermissionAccessProps> = ({
  action,
  fallback = null,
  children,
}) => {
  const { isAllowed } = usePagePermissions();
  if (!isAllowed(action)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};

export default PermissionAccess;
