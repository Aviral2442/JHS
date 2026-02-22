import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import DataTableFilters from "../../../../components/tables/DataTableFilters";
import DataTablePagination from "../../../../components/tables/DataTablePagination";
import DatatableActionButton from "../../../../components/DatatableActionButton";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../components/DateFormat";

const baseURL = (import.meta as any).env.VITE_BACK_URL || "";
const ENDPOINT = "/api/booking/get_booking_list";

interface BookingItem {
  booking_id: number;
  category_level1_name: string;
  category_level3_name: string;
  booking_city_name: string;
  consumer_full_name: string;
  booking_consumer_id: number;
  consumer_mobile: string;
  booking_address: string;
  booking_state_name: string;
  booking_status: number;
  booking_schedule_time: string | number;
  booking_createdAt: string | number;
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

const statusMap: Record<number, { label: string; className: string }> = {
  0: { label: "Enquiry", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  1: { label: "Confirm", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
  2: { label: "Vendor Assigned", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  3: { label: "Ongoing", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  4: { label: "Complete", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  5: { label: "Cancelled", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

const BookingList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<BookingItem[]>([]);
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

  const fetchBookings = useCallback(async (page = 1) => {
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
      setBookings(data?.jsonData?.booking_list || []);
      setPagination(
        data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 },
      );
    } catch (error) {
      console.error("Failed to fetch booking list:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings(1);
  }, [fetchBookings]);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFilterChange = (filters: Filters) => {
    filtersRef.current = filters;
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      fetchBookings(1);
    }, 400);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    filtersRef.current.search = val;
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      fetchBookings(1);
    }, 400);
  };

  const handlePageChange = (page: number) => {
    fetchBookings(page);
  };

  const getStatusBadge = (status: number) => {
    return statusMap[status] || { label: "Unknown", className: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400" };
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5 lg:p-6 space-y-5">
        {/* Filters Row */}
        <DataTableFilters
          title="Booking List"
          onFilterChange={handleFilterChange}
          onAddNew={() => navigate("/admin/booking/add")}
        />

        {/* Export & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <DatatableActionButton
            endpoint={ENDPOINT}
            dataAccess="booking_list"
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
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">S.No.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Consumer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Mobile</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Service Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">City</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Schedule</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-gray-400 dark:text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-gray-400 dark:text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking, idx) => {
                  const sNo = (pagination.page - 1) * pagination.limit + idx + 1;
                  const badge = getStatusBadge(booking.booking_status);

                  return (
                    <tr
                      key={booking.booking_id}
                      className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/40 transition-colors"
                    >
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{sNo}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{booking.booking_id}</td>
                      <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 max-w-xs truncate">
                        {booking.consumer_full_name || "—"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                        {booking.consumer_mobile || "—"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                        {booking.category_level1_name || "—"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                        {booking.category_level3_name || "—"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                        {booking.booking_city_name || "—"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {booking.booking_schedule_time ? formatDate(booking.booking_schedule_time) : "—"}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(booking.booking_createdAt)}
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex px-3 py-0.5 text-xs font-medium ${badge.className}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center gap-2">
                          {/* Edit */}
                          <button
                            onClick={() => navigate(`/admin/booking/edit/${booking.booking_id}`)}
                            title="Edit Booking"
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
                            onClick={() => navigate(`/admin/booking/detail/${booking.booking_id}`)}
                            title="View Details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600
                              hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

export default BookingList;
