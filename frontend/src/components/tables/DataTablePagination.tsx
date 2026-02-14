import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DataTablePagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages < 1) return null;

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-3">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing page <span className="font-medium text-gray-700 dark:text-gray-200">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-700 dark:text-gray-200">{totalPages}</span>
      </p>

      <nav className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500
            hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
            dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, idx) =>
          page === "..." ? (
            <span
              key={`dots-${idx}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-gray-400 dark:text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors
                ${
                  currentPage === page
                    ? "bg-brand-500 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500
            hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
            dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default DataTablePagination;
