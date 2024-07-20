// Dependencies
import React, { useEffect, useState } from "react";

// Icons
import { Star } from "lucide-react";
// Components
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Custom components
import Review from "@/components/myUi/Review";
// Types
import reviewType from "@/types/Review";

const Reviews: React.FC<{ productId: String }> = ({ productId }) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviews, setReviews] = useState<reviewType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    getReviewsOfProduct();
    getAverageRating();
    console.log(averageRating);
  }, []);
  async function getReviewsOfProduct() {
    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_BaseUrl;
      interface JsonType {
        msg: string;
        reviews: reviewType[];
      }
      let response = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/reviews/?id=" + productId
      );
      let json: JsonType = await response.json();
      setIsLoading(false);

      if (response.ok) {
        setReviews(json.reviews);
        return;
      }

      return toast({
        title: "error",
        description: json.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  async function getAverageRating() {
    try {
      const baseUrl = import.meta.env.VITE_BaseUrl;
      interface JsonType {
        msg: string;
        averageRating: number;
      }
      let response = await fetch(
        import.meta.env.VITE_BackendUrl +
          baseUrl +
          "/reviews/average-rating/?id=" +
          productId
      );
      let json: JsonType = await response.json();

      if (response.ok) {
        console.log("Before: ", json.averageRating);
        setAverageRating(json.averageRating);
        return;
      }
      return toast({
        title: "Error",
        description: json.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      console.log(error);
      return toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-wrap gap-6  p-4 ">
      {!isLoading ? (
        <>
          <div className="flex justify-between w-[100%]">
            <h3 className="text-4xl font-bol">Reviews</h3>
            <div className="flex gap-1 items-center">
              {Array(5)
                .fill(0)
                .map((_, i: number) => (
                  <>
                    <Star
                      key={i}
                      className="md:size-10"
                      fill={averageRating > i + 1 ? "yellow" : "none"}
                    />
                  </>
                ))}
            </div>
          </div>
          {reviews.map((review: reviewType, i: number) => (
            <Review key={i} review={review} />
          ))}
        </>
      ) : (
        // {/* product reviews */}
        <div className="flex flex-wrap gap-4  p-2 ">
          {Array(6)
            .fill(0)
            .map((_, i: number) => (
              <div className="flex flex-col gap-2 w-[100%]" key={i}>
                {/* userInfo */}
                <div className="flex justify-between md:w-[20%]">
                  {/* Profile picture */}
                  <Skeleton className="h-16 w-16 rounded-full" />
                  {/* starts or rating */}
                  <div className="flex gap-1 items-center">
                    <Skeleton className=" h-6 w-6 rounded-full " />
                    <Skeleton className=" h-6 w-6 rounded-full" />
                    <Skeleton className=" h-6 w-6 rounded-full" />
                    <Skeleton className=" h-6 w-6 rounded-full" />
                    <Skeleton className=" h-6 w-6 rounded-full" />
                  </div>
                </div>
                {/* userName */}
                <Skeleton className=" h-10 w-[40%] " />
                {/* review line 1 */}
                <Skeleton className=" h-16 w-[90%] " />
                {/* review line 2 */}
                <Skeleton className=" h-28 w-[95%]" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
