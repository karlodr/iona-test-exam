import { FC } from "react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1);

  return (
    <div className="join">
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`join-item btn btn-md${page === currentPage ? " btn-active" : ""}`}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};