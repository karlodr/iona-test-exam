import { FC } from "react";

type CategorySidebarProps = {
  title: string;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
};

export const CategorySidebar: FC<CategorySidebarProps> = ({
  title,
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-col gap-y-2 border-r border-gray-200 pb-4">
      <h3 className="text-xs font-bold">{title}</h3>
      <div className="flex flex-col gap-y-2">
        {categories.map((category, index) => {
          const checked = selectedCategories.includes(category);
          return (
            <div
              key={category}
              className="flex items-center gap-x-2 text-sm select-none"
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={checked}
                onChange={(e) => onCategoryChange(category, e.target.checked)}
                id={`category-${index}`}
              />
              <label
                htmlFor={`category-${index}`}
                className="cursor-pointer"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    onCategoryChange(category, !checked);
                  }
                }}
              >
                {category}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
