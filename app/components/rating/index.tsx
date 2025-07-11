import { FC } from "react";

export type RatingProps = {
  rating: number;
  ratingCount?: number;
  className?: string;
};

export const Rating: FC<RatingProps> = ({ rating, ratingCount, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < Math.round(rating) ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}
      >
        &#9733;
      </span>
    ))}
    <span className="ml-2 text-sm text-gray-500">
      ({rating.toFixed(1)}/5{ratingCount ? `, ${ratingCount} reviews` : ""})
    </span>
  </div>
);
