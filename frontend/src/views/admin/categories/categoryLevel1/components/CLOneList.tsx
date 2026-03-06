import React, { useCallback, useEffect, useRef, useState } from "react";
import DataTableFilters from "../../../../../components/tables/DataTableFilters";
import DataTablePagination from "../../../../../components/tables/DataTablePagination";
import { useNavigate } from "react-router";
import DatatableActionButton from "../../../../../components/DatatableActionButton";
import { formatDate } from "../../../../../components/DateFormat";
import Api from "../../../../../components/apicall";

const baseURL = (import.meta as any).env.VITE_URL || "";
const ENDPOINT = "/api/category/get_category_level_one_list";

interface CategoryLevelOneItem {
  category_level1_id: number;
  category_level1_name: string;
  category_level1_img: string;
  category_level1_status: number;
  category_level1_createdAt: string;
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

const CLOneList: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryLevelOneItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const api = Api();

  // Store the latest filters in a ref so the fetch function always uses the latest values
  const filtersRef = useRef<Filters>({
    date: "",
    status: "",
    fromDate: "",
    toDate: "",
    search: "",
  });

  const fetchBlogs = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const f = filtersRef.current;

      const params: Record<string, string | number> = {
        page,
        limit: 10,
      };

      if (f.date) params.date = f.date;
      if (f.status) params.status = f.status;
      if (f.fromDate) params.fromDate = f.fromDate;
      if (f.toDate) params.toDate = f.toDate;
      if (f.search) params.search = f.search;

      const res = await api.fetchCategoryLevelOneList(params);
      console.log(res);
      if (res.success) {
        console.log("Fetched category level one list data:", res.data);
        setCategories(res.data);
        setPagination(res.pagination);
      } else {
        console.error("Failed to fetch category level one list:", res.error);
      }
    } catch (error) {
      console.error("Failed to fetch category level one list:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(1);
  }, [fetchBlogs]);

  // Debounce timer ref for search
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFilterChange = (filters: Filters) => {
    filtersRef.current = { ...filters, search: filtersRef.current.search };
    fetchBlogs(1);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    filtersRef.current.search = val;

    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      fetchBlogs(1);
    }, 400);
  };

  const handlePageChange = (page: number) => {
    fetchBlogs(page);
  };

  const handleStatusToggle = async (
    categoryId: number,
    currentStatus: number,
  ) => {
    const newStatus = currentStatus == 0 ? 1 : 0;
    console.log(
      `Toggling status for category level one ID ${categoryId} from ${currentStatus} to ${newStatus}`,
    );
    try {
      const res = await api.toggleStatusOFCategoryLevelOne(
        categoryId,
        newStatus,
      );
      if (res.success) {
        fetchBlogs(pagination.page);
      } else {
        console.error("Failed to update category level one status:", res.error);
      }
    } catch (error) {
      console.error("Failed to update category level one status:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5 lg:p-6 space-y-5">
        {/* Filters Row */}
        <DataTableFilters
          title="Category Level One List"
          onFilterChange={handleFilterChange}
          onAddNew={() => navigate("/admin/category/level-one/add")}
        />

        {/* Export Buttons + Search */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <DatatableActionButton
            endpoint={ENDPOINT}
            dataAccess="category_level_one_list"
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
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Status
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
              ) : categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-gray-400 dark:text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((category, idx) => {
                  const sNo =
                    (pagination.page - 1) * pagination.limit + idx + 1;
                  const isActive = category.category_level1_status == 0;

                  return (
                    <tr
                      key={category.category_level1_id}
                      className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/40 transition-colors"
                    >
                      {/* S.No. */}
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {sNo}
                      </td>

                      {/* ID */}
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {category.category_level1_id}
                      </td>
                      {/* Image */}
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {category.category_level1_img ? (
                          <img
                            src={`${baseURL}${category.category_level1_img}`}
                            alt={category.category_level1_name}
                            className="h-7 w-7 rounded object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200 dark:bg-gray-700">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              No Image
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Category Level One Title */}
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 max-w-xs truncate">
                        {category.category_level1_name}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(category.category_level1_createdAt)}
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex px-3 py-0.5 text-xs font-medium
                            ${
                              isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center gap-2">
                          {/* Toggle Status */}
                          <button
                            onClick={() =>
                              handleStatusToggle(
                                category.category_level1_id,
                                category.category_level1_status,
                              )
                            }
                            title={isActive ? "Deactivate" : "Activate"}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors
                              ${
                                isActive
                                  ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                                  : "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                              }`}
                          >
                            {isActive ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M12 4L4 12M4 4L12 12"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M3 8L6.5 11.5L13 4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/category/level-one/edit/${category.category_level1_id}`,
                              )
                            }
                            title="Edit Category Level One"
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
        {categories.length > 0 && (
          <DataTablePagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CLOneList;
