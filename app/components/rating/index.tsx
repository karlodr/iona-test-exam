import { FC } from "react";

export type RatingProps = {
  ratings: number;
  className?: string;
};

export const Rating: FC<RatingProps> = ({ ratings, className = "" }) => {
  const rating = Math.max(0, Math.min(5, ratings));
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      // Full star
      stars.push(
        <span
          key={i}
          className="text-yellow-400 text-xl"
          aria-label="Full star"
        >
          &#9733;
        </span>,
      );
    } else if (rating >= i + 0.5) {
      // Half star
      stars.push(
        <span
          key={i}
          className="text-yellow-400 text-xl relative"
          aria-label="Half star"
        >
          <span
            style={{
              position: "absolute",
              width: "50%",
              overflow: "hidden",
              display: "inline-block",
            }}
          >
            &#9733;
          </span>
          <span className="text-gray-300 text-xl">&#9733;</span>
        </span>,
      );
    } else {
      // Empty star
      stars.push(
        <span key={i} className="text-gray-300 text-xl" aria-label="Empty star">
          &#9733;
        </span>,
      );
    }
  }

  return <div className={`flex items-center ${className}`}>{stars}</div>;
};
