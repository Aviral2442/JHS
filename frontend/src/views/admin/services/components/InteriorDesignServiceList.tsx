import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import DataTableFilters from "../../../../components/tables/DataTableFilters";
import DataTablePagination from "../../../../components/tables/DataTablePagination";
import { useNavigate } from "react-router";
import DatatableActionButton from "../../../../components/DatatableActionButton";
import { formatDate } from "../../../../components/DateFormat";

const baseURL = (import.meta as any).env.VITE_URL || "";
const ENDPOINT = "/api/consumer/get_consumers_list";

interface ConsumerItem {
    consumer_id: number;
    consumer_profile_pic: string;
    consumer_full_name: string;
    consumer_email: string;
    consumer_mobile: string;
    consumer_createdAt: string | number;
    consumer_status: number;
    consumer_address: string;
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

const InteriorDesignServiceList: React.FC = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [consumers, setConsumers] = useState<ConsumerItem[]>([]);
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

    const fetchConsumers = useCallback(async (page = 1) => {
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

            const res = await axios.get(`${baseURL}${ENDPOINT}`, { params });
            const data = res.data;
            setConsumers(data?.jsonData?.consumer_list || []);
            setPagination(
                data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 },
            );
        } catch (error) {
            console.error("Failed to fetch consumer list:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchConsumers(1);
    }, [fetchConsumers]);

    // Debounce timer ref for search
    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleFilterChange = (filters: Filters) => {
        filtersRef.current = filters;

        // Debounce search, instant for other filters
        if (searchTimer.current) clearTimeout(searchTimer.current);

        searchTimer.current = setTimeout(() => {
            fetchConsumers(1);
        }, 400);
    };

    const handleSearchChange = (val: string) => {
        setSearch(val);
        filtersRef.current.search = val;

        if (searchTimer.current) clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            fetchConsumers(1);
        }, 400);
    };

    const handlePageChange = (page: number) => {
        fetchConsumers(page);
    };

    const handleStatusToggle = async (consumerId: number, currentStatus: number) => {
        const newStatus = currentStatus == 0 ? 1 : 0;
        console.log(`Toggling status for consumer ID ${consumerId} from ${currentStatus} to ${newStatus}`); // Debug log to check values before API call
        try {
            await axios.patch(`${baseURL}/api/consumer/update_consumer_status/${consumerId}`, {
                consumer_status: newStatus,
            });
            console.log(`Consumer ID ${consumerId} status updated to ${newStatus}`);
            fetchConsumers(pagination.page);
        } catch (error) {
            console.error("Failed to update consumer status:", error);
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="p-5 lg:p-6 space-y-5">
                {/* Filters Row */}
                <DataTableFilters
                    title="Manage Interior Design Services"
                    onFilterChange={handleFilterChange}
                    onAddNew={() => navigate("/admin/services/add")}
                    statusOptions={[
                        { label: "Active", value: 'active' },
                        { label: "Inactive", value: 'inactive' },
                        { label: "Blocked", value: 'block' }
                    ]}
                />

                {/* Export Buttons */}
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
                                    Profile
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Mobile
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Email
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
                            ) : consumers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-10 text-center text-gray-400 dark:text-gray-500"
                                    >
                                        No consumers found.
                                    </td>
                                </tr>
                            ) : (
                                consumers.map((consumer, idx) => {
                                    const sNo =
                                        (pagination.page - 1) * pagination.limit + idx + 1;
                                    const isActive = consumer.consumer_status == 0;

                                    return (
                                        <tr
                                            key={consumer.consumer_id}
                                            className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/40 transition-colors"
                                        >
                                            {/* S.No. */}
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                                {sNo}
                                            </td>

                                            {/* ID */}
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                                {consumer.consumer_id}
                                            </td>

                                            {/* PROFILE */}
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                                {consumer.consumer_profile_pic ? (
                                                    <img
                                                        src={`${baseURL}${consumer.consumer_profile_pic}`}
                                                        alt="Profile"
                                                        className="h-8 w-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <img
                                                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_user_personalization&w=740&q=80"
                                                        alt="Default Profile"
                                                        className="h-8 w-8 rounded-full object-cover"
                                                    />
                                                )}
                                            </td>

                                            {/* Name */}
                                            <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 max-w-xs truncate">
                                                {consumer.consumer_full_name || ""}
                                            </td>

                                            {/* Mobile */}
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 max-w-sm truncate">
                                                {consumer.consumer_mobile || ""}
                                            </td>

                                            {/* EMAIL */}
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 max-w-sm truncate">
                                                {consumer.consumer_email || ""}
                                            </td>

                                            {/* Date */}
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                {formatDate(consumer.consumer_createdAt)}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`inline-flex px-3 py-0.5 text-xs font-medium
                                                        ${isActive
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
                                                        onClick={() => handleStatusToggle(consumer.consumer_id, consumer.consumer_status)}
                                                        title={isActive ? "Deactivate" : "Activate"}
                                                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors
                                                             ${isActive
                                                                ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                                                                : "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                                                            }`}
                                                    >
                                                        {isActive ? (
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                            </svg>
                                                        ) : (
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                    </button>

                                                    {/* Edit */}
                                                    <button
                                                        onClick={() => navigate(`/admin/consumer/edit/${consumer.consumer_id}`)}
                                                        title="Edit Consumer"
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600
                                                        hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-400 dark:hover:bg-brand-900/50 transition-colors"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path
                                                                d="M11.334 2.00004C11.5091 1.82494 11.7169 1.68605 11.9457 1.59129C12.1745 1.49653 12.4197 1.44775 12.6673 1.44775C12.915 1.44775 13.1602 1.49653 13.389 1.59129C13.6178 1.68605 13.8256 1.82494 14.0007 2.00004C14.1758 2.17513 14.3147 2.383 14.4094 2.61178C14.5042 2.84055 14.553 3.08575 14.553 3.33337C14.553 3.581 14.5042 3.8262 14.4094 4.05497C14.3147 4.28375 14.1758 4.49161 14.0007 4.66671L5.00065 13.6667L1.33398 14.6667L2.33398 11L11.334 2.00004Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.3"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                    {/* View Details */}
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/consumer/detail/${consumer.consumer_id}`,
                                                            )
                                                        }
                                                        title="View Details"
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600
                                                        hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                                                    >
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M8 3C4.5 3 1.73 5.61 1 9c.73 3.39 3.5 6 7 6s6.27-2.61 7-6c-.73-3.39-3.5-6-7-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                                                                fill="currentColor"
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

export default InteriorDesignServiceList;
