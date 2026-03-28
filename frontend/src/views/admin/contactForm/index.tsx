import React, { useCallback, useEffect, useRef, useState } from "react";
import DataTableFilters from "../../../components/tables/DataTableFilters";
import DataTablePagination from "../../../components/tables/DataTablePagination";
import DatatableActionButton from "../../../components/DatatableActionButton";
import { formatDate } from "../../../components/DateFormat";
import Api from "../../../components/apicall";

interface ContactFormItem {
    contactForm_id: number;
    contactForm_name: string;
    contactForm_mobile: string;
    contactForm_email: string;
    contactForm_subject: string;
    contactForm_message: string;
    contactForm_status: number;
    contactForm_createdAt: string | number;
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

const ContactFormList: React.FC = () => {
    const api = Api();
    const [search, setSearch] = useState("");
    const [contactForms, setContactForms] = useState<ContactFormItem[]>([]);
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

    const fetchContactForms = useCallback(async (page = 1) => {
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

            const res = await api.fetchContactUsList(params);
            if (!res.success) {
                setContactForms([]);
                setPagination({ page: 1, limit: 10, total: 0, totalPages: 1 });
                return;
            }

            setContactForms(res.data || []);
            setPagination(
                res.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 },
            );
        } catch (error) {
            console.error("Failed to fetch contact form list:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContactForms(1);
    }, [fetchContactForms]);

    // Debounce timer ref for search
    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleFilterChange = (filters: Filters) => {
        filtersRef.current = filters;

        // Debounce search, instant for other filters
        if (searchTimer.current) clearTimeout(searchTimer.current);

        searchTimer.current = setTimeout(() => {
            fetchContactForms(1);
        }, 400);
    };

    const handleSearchChange = (val: string) => {
        setSearch(val);
        filtersRef.current.search = val;

        if (searchTimer.current) clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            fetchContactForms(1);
        }, 400);
    };

    const handlePageChange = (page: number) => {
        fetchContactForms(page);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="p-5 lg:p-6 space-y-5">
                {/* Filters Row */}
                <DataTableFilters
                    title="Manage Contact Forms"
                    onFilterChange={handleFilterChange}
                    statusOptions={[
                        { label: "Active", value: 'active' },
                        { label: "Inactive", value: 'inactive' }
                    ]}
                />

                {/* Export Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <DatatableActionButton
                        endpoint={"/admin/get_contact_us_list"}
                        dataAccess="contact_form_list"
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
                                    Subject
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
                                    Message
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="px-4 py-10 text-center text-gray-400 dark:text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : contactForms.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="px-4 py-10 text-center text-gray-400 dark:text-gray-500"
                                    >
                                        No contact forms found.
                                    </td>
                                </tr>
                            ) : (
                                contactForms.map((contactForm, idx) => {
                                    const sNo =
                                        (pagination.page - 1) * pagination.limit + idx + 1;
                                    const isActive = contactForm.contactForm_status === 0;

                                    return (
                                        <tr
                                            key={contactForm.contactForm_id}
                                            className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/40 transition-colors"
                                        >
                                            {/* S.No. */}
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                                {sNo}
                                            </td>

                                            {/* ID */}
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                                {contactForm.contactForm_id}
                                            </td>

                                            {/* Subject */}
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                                                {contactForm.contactForm_subject || ""}
                                            </td>

                                            {/* Name */}
                                            <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 max-w-xs truncate">
                                                {contactForm.contactForm_name || ""}
                                            </td>

                                            {/* Mobile */}
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 max-w-sm truncate">
                                                {contactForm.contactForm_mobile || ""}
                                            </td>

                                            {/* EMAIL */}
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 max-w-sm truncate">
                                                {contactForm.contactForm_email || ""}
                                            </td>

                                            {/* Message */}
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 max-w-md truncate">
                                                {contactForm.contactForm_message || ""}
                                            </td>

                                            {/* Date */}
                                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                {formatDate(contactForm.contactForm_createdAt)}
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

export default ContactFormList;
