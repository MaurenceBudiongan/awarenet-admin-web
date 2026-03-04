"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getVisiblePages = () => {
    const pages: number[] = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push(-1);

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (end < totalPages - 1) pages.push(-1);
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className="mt-4 flex items-center justify-between gap-2 px-2 pb-4">

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {currentPage} of {totalPages}
      </p>

      {/* Prev Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border px-3 py-1.5 text-sm font-medium transition
        border-zinc-300 text-zinc-800 hover:bg-zinc-100
        dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800
        disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="px-1 text-zinc-400 dark:text-zinc-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              page === currentPage
                ? `
                bg-zinc-900 text-white
                dark:bg-white dark:text-zinc-900
                `
                : `
                border border-zinc-300 text-zinc-800 hover:bg-zinc-100
                dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800
                `
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border px-3 py-1.5 text-sm font-medium transition
        border-zinc-300 text-zinc-800 hover:bg-zinc-100
        dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800
        disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;