import { FC } from "react";

type FeatureItemProps = {
  title: string;
  description: string;
};

const FeatureItem: FC<FeatureItemProps> = ({ title, description }) => (
  <li>
    <span className="font-semibold">{title}:</span> {description}
  </li>
);

export const FeaturesList: FC = () => (
  <div className="w-full max-w-xs mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-2">Features</h2>
    <ol className="list-decimal list-inside text-gray-700 space-y-2">
      <FeatureItem
        title="Browse"
        description="Explore our curated product list."
      />
      <FeatureItem
        title="Search & Sort"
        description="Use the search bar and sorting options to find what you need."
      />
      <FeatureItem
        title="View Details"
        description="Click on a product to see more information."
      />
    </ol>
  </div>
);
