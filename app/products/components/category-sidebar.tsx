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
        {categories.map((category, index) => (
          <div key={category} className="flex items-center gap-x-2 text-sm">
            <input
              type="checkbox"
              className="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={e => onCategoryChange(category, e.target.checked)}
              id={`category-${index}`}
            />
            <label className="label" htmlFor={`category-${index}`}>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};