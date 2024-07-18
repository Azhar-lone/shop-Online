import React from "react";
// Icons
import { Star, ChevronDownCircle, Edit2, DeleteIcon } from "lucide-react";

// components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Custom Components
import User from "./User";

// context
import useUser from "../context/user-provider";

// types
import reviewType, { replyType } from "@/types/Review";

interface review {
  review: reviewType;
}

const Review: React.FC<review> = ({ review }) => {
  const { user } = useUser();

  return (
    <div className="flex md:gap-6 gap-2 flex-col w-[100%]">
      {/* Owner Info */}
      <User user={review.reviewBy} />
      {/* if Current users product then show edit button*/}

      {user._id === review.reviewBy._id && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDownCircle />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Edit <Edit2 />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Delete <DeleteIcon />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
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

// reply

interface reply {
  reply: replyType;
}

const Reply: React.FC<reply> = ({ reply }) => {
  const { user } = useUser();

  return (
    <div className="flex md:gap-6 gap-2 flex-col w-[100%]">
      {/* Owner Info */}
      <User user={reply.replyBy} />
      {/* if Current users product then show edit button*/}

      {user._id === reply.replyBy._id && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDownCircle />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Edit <Edit2 />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Delete <DeleteIcon />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div>
        <h1>{new Date(reply.createdAt).toDateString()}</h1>
        {reply.createdAt !== reply.updatedAt && <h1>edited</h1>}
      </div>
      <p className="p-2">{reply.reply}</p>
    </div>
  );
};
