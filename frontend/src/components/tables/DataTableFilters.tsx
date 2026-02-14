import React, { useState } from "react";

type QuickFilterOption = "today" | "yesterday" | "thisWeek" | "thisMonth" | "custom" | "";
type StatusOption = "active" | "inactive" | "";

interface Props {
  onFilterChange: (filters: {
    date: QuickFilterOption;
    status: StatusOption;
    fromDate: string;
    toDate: string;
    search: string;
  }) => void;
  onAddNew?: () => void;
  title: string;
}

const DataTableFilters: React.FC<Props> = ({ onFilterChange, onAddNew, title }) => {
  const [quickFilter, setQuickFilter] = useState<QuickFilterOption>("");
  const [status, setStatus] = useState<StatusOption>("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const emitFilters = (overrides: Partial<{
    date: QuickFilterOption;
    status: StatusOption;
    fromDate: string;
    toDate: string;
    search: string;
  }> = {}) => {
    onFilterChange({
      date: overrides.date ?? quickFilter,
      status: overrides.status ?? status,
      fromDate: overrides.fromDate ?? fromDate,
      toDate: overrides.toDate ?? toDate,
      search: "",
    });
  };

  const handleQuickFilter = (val: QuickFilterOption) => {
    setQuickFilter(val);
    if (val !== "custom") {
      setFromDate("");
      setToDate("");
    }
    emitFilters({ date: val, fromDate: val !== "custom" ? "" : fromDate, toDate: val !== "custom" ? "" : toDate });
  };

  const handleStatus = (val: StatusOption) => {
    setStatus(val);
    emitFilters({ status: val });
  };

  const handleDateChange = (type: "from" | "to", val: string) => {
    if (type === "from") {
      setFromDate(val);
      emitFilters({ date: "custom", fromDate: val });
      setQuickFilter("custom");
    } else {
      setToDate(val);
      emitFilters({ date: "custom", toDate: val });
      setQuickFilter("custom");
    }
  };

  return (
    <div>
      {/* Title + Filter Controls + Add New */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          {/* Custom Date Range */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => handleDateChange("from", e.target.value)}
              className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
                dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
              placeholder="From date"
            />
            <span className="text-gray-400 dark:text-gray-500">–</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => handleDateChange("to", e.target.value)}
              className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
                dark:border-gray-600 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
              placeholder="To date"
            />
          </div>

          {/* Quick Filter */}
          <select
            value={quickFilter}
            onChange={(e) => handleQuickFilter(e.target.value as QuickFilterOption)}
            className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
              dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
          >
            <option value="">Quick filter</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => handleStatus(e.target.value as StatusOption)}
            className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700
              dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:border-brand-500 focus:outline-none"
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Add New Button */}
          {onAddNew && (
            <button
              onClick={onAddNew}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-500 bg-transparent px-4 py-2
                text-sm font-medium text-brand-500 hover:bg-brand-500 hover:text-white transition-colors
                dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-400 dark:hover:text-white"
            >
              Add New
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.16699 7H12.8337M12.8337 7L7.00033 1.16667M12.8337 7L7.00033 12.8333"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTableFilters;
