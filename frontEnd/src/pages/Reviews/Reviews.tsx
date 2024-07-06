import React from "react";
import { Star, SendHorizonal } from "lucide-react";

import Review from "@/components/myUi/Review";
import { Textarea } from "@/components/ui/textarea";

import reviewType from "@/types/Review";
const Reviews: React.FC<{ reviews: reviewType[] }> = ({ reviews }) => {
  return (
    <div className="flex flex-wrap gap-6  p-4 ">
      <div className="flex flex-col gap-4 w-[100%] ">
        <div className="flex justify-between">
          <h1 className="text-2xl">Add a Review</h1>
          <div className="flex gap-1  items-center">
            {Array(5)
              .fill(0)
              .map((_, i: number) => (
                <>
                  <Star key={i} />
                </>
              ))}
          </div>
        </div>
        {/* replace this input with shadcn input comp */}
        <div className={` flex gap-2 items-center relative w-[100%] `}>
          <Textarea draggable />
          <div className="absolute right-8 bottom-2">
            <SendHorizonal />
          </div>
        </div>
      </div>

      <div className="flex justify-between w-[100%]">
        <h3 className="text-4xl font-bol">Reviews</h3>
        <div className="flex gap-1 items-center">
          {Array(5)
            .fill(0)
            .map((_, i: number) => (
              <>
                <Star key={i} />
              </>
            ))}
        </div>
      </div>

      {reviews.map((review: reviewType, i: number) => (
        <Review key={i} review={review} />
      ))}
    </div>
  );
};

export default Reviews;
