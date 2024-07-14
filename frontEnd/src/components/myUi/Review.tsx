import React from "react";
// Icons
import { Star } from "lucide-react";

// components
// Custom Components
import User from "./User";
// types
import reviewType from "@/types/Review";

interface review {
  review: reviewType;
}
const Review: React.FC<review> = ({ review }) => {
  return (
    <div className="flex md:gap-6 gap-2 flex-col w-[100%]">
      {/* Owner Info */}
      <User user={review.reviewBy} />
      <div className="gap-2 flex flex-col">
        <div className="flex gap-2 items-center ">
          {Array(5)
            .fill(0)
            .map((_, i: number) => (
              <>
                <Star
                  key={i}
                  fill={review.rating > i + 1 ? "yellow" : "none"}
                />
              </>
            ))}
        </div>

        <div>
          <h1>{new Date(review.createdAt).toDateString()}</h1>
          {review.createdAt !== review.updatedAt && <h1>edited</h1>}
        </div>
        <p className="p-2">{review.review}</p>
      </div>
    </div>
  );
};

export default Review;
