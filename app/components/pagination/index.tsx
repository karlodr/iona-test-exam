import { FC } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function getPageNumbers(
  totalPages: number,
  currentPage: number,
  maxVisible: number = 5,
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = end - maxVisible + 1;
  }

  return Array.from({ length: maxVisible }, (_, i) => start + i);
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <div className="join flex items-center gap-1">
      <button
        className="join-item btn btn-md"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
      >
        &lt;
      </button>
      {pageNumbers[0] > 1 && (
        <>
          <button
            className={`join-item btn btn-md${1 === currentPage ? " btn-active" : ""}`}
            onClick={() => onPageChange(1)}
            disabled={1 === currentPage}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className="px-2">...</span>}
        </>
      )}
      {pageNumbers.map((page) =>
        page !== 1 && page !== totalPages ? (
          <button
            key={page}
            className={`join-item btn btn-md${page === currentPage ? " btn-active" : ""}`}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ) : null,
      )}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            className={`join-item btn btn-md${totalPages === currentPage ? " btn-active" : ""}`}
            onClick={() => onPageChange(totalPages)}
            disabled={totalPages === currentPage}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="join-item btn btn-md"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
};
