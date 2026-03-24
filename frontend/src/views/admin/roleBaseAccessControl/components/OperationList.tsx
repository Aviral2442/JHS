import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import DataTableFilters from "../../../../components/tables/DataTableFilters";
import DataTablePagination from "../../../../components/tables/DataTablePagination";
import { useNavigate } from "react-router";
import DatatableActionButton from "../../../../components/DatatableActionButton";
import { formatDate } from "../../../../components/DateFormat";

const baseURL = (import.meta as any).env.VITE_URL || "";
const ENDPOINT = "/api/role-base-access-control/get_operations_list";

interface OperationItem {
  operation_id: number;
  module_id: number;
  module_name: string;
  operation_name: string;
  operation_slug: string;
  created_at: string | number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Filters {
  date: string;
  status: string;
  fromDate: string;
  toDate: string;
  search: string;
}

const OperationList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [operations, setOperations] = useState<OperationItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const filtersRef = useRef<Filters>({
    date: "",
    status: "",
    fromDate: "",
    toDate: "",
    search: "",
  });

  const fetchOperations = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const f = filtersRef.current;

      const params: Record<string, string | number> = {
        page,
        limit: 10,
      };

      if (f.date) params.date = f.date;
      if (f.fromDate) params.fromDate = f.fromDate;
      if (f.toDate) params.toDate = f.toDate;
      if (f.search) params.search = f.search;

      const res = await axios.get(`${baseURL}${ENDPOINT}`, { params });
      const data = res.data;
      setOperations(data?.jsonData?.operations_list || []);
      setPagination(
        data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 },
      );
    } catch (error) {
      console.error("Failed to fetch operations list:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOperations(1);
  }, [fetchOperations]);

  // Debounce timer ref for search
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFilterChange = (filters: Filters) => {
    filtersRef.current = {
      ...filters,
      status: "",
    };

    // Debounce search, instant for other filters
    if (searchTimer.current) clearTimeout(searchTimer.current);

    searchTimer.current = setTimeout(() => {
      fetchOperations(1);
    }, 400);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    filtersRef.current.search = val;

    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      fetchOperations(1);
    }, 400);
  };

  const handlePageChange = (page: number) => {
    fetchOperations(page);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5 lg:p-6 space-y-5">
        {/* Filters Row */}
        <DataTableFilters
          title="Manage Operations"
          onFilterChange={handleFilterChange}
          onAddNew={() => navigate("/admin/operations/add")}
          statusOptions={[]}
        />

        {/* Export Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <DatatableActionButton
            endpoint={ENDPOINT}
            dataAccess="operations_list"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Search:
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search..."
              className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
                             dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  S.No.
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Module
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Operation Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-gray-400 dark:text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : operations.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-gray-400 dark:text-gray-500"
                  >
                    No operations found.
                  </td>
                </tr>
              ) : (
                operations.map((operation, idx) => {
                  const sNo =
                    (pagination.page - 1) * pagination.limit + idx + 1;

                  return (
                    <tr
                      key={operation.operation_id}
                      className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/40 transition-colors"
                    >
                      {/* S.No. */}
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {sNo}
                      </td>

                      {/* ID */}
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {operation.operation_id}
                      </td>

                      {/* MODULE */}
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {operation.module_name ||
                          `Module #${operation.module_id}`}
                      </td>

                      {/* OPERATION NAME */}
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 max-w-xs truncate">
                        {operation.operation_name || "-"}
                      </td>

                      {/* SLUG */}
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 max-w-sm truncate">
                        {operation.operation_slug || "-"}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(operation.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center gap-2">
                          {/* Edit */}
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/operations/edit/${operation.operation_id}`,
                              )
                            }
                            title="Edit Operation"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600
                                                        hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-400 dark:hover:bg-brand-900/50 transition-colors"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.915 1.44775 13.1602 1.49653 13.389 1.59129C13.6178 1.68605 13.8256 1.82494 14.0007 2.00004C14.1758 2.17513 14.3147 2.383 14.4094 2.61178C14.5042 2.84055 14.553 3.08575 14.553 3.33337C14.553 3.581 14.5042 3.8262 14.4094 4.05497C14.3147 4.28375 14.1758 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <DataTablePagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OperationList;
