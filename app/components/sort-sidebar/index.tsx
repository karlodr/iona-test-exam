import { FC } from "react";

type SortKey = "title" | "rating";
type SortOrder = "asc" | "desc";

type SortSidebarProps = {
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSortOrder: () => void;
};

export const SortSidebar: FC<SortSidebarProps> = ({
  sortKey,
  sortOrder,
  onSortKeyChange,
  onToggleSortOrder,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center font-semibold mb-2 gap-2">
        <span>Sort By</span>
        <span
          className="cursor-pointer text-lg select-none"
          onClick={onToggleSortOrder}
          title={`Sort ${sortOrder === "asc" ? "ascending" : "descending"}`}
          tabIndex={0}
          role="button"
          aria-label={`Toggle sort order, currently ${sortOrder === "asc" ? "ascending" : "descending"}`}
          onKeyDown={e => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onToggleSortOrder();
            }
          }}
        >
          {sortOrder === "asc" ? (
            <span>&#8593;</span>
          ) : (
            <span>&#8595;</span>
          )}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sort"
            value="title"
            checked={sortKey === "title"}
            onChange={onSortKeyChange}
            className="radio radio-primary"
          />
          <span>Name</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sort"
            value="rating"
            checked={sortKey === "rating"}
            onChange={onSortKeyChange}
            className="radio radio-primary"
          />
          <span>Rating</span>
        </label>
      </div>
    </div>
  );
};