// Dependencies
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Icons
import { Star, SendHorizonal } from "lucide-react";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Contexts
import useUser from "@/components/context/user-provider";
import { useToast } from "@/components/ui/use-toast";

const AddReview: React.FC<{ productId: String }> = ({ productId }) => {
  const { isLogin, user } = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
      rating: 0,
    },
  });

  async function onReviewSubmit(values: z.infer<typeof reviewSchema>) {
    try {
      const baseUrl = import.meta.env.VITE_BaseUrl;
      interface JsonType {
        msg: string;
      }
      let response = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/reviews/" + productId,
        {
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials:"include"
        }
      );
      let json: JsonType = await response.json();

      if (response.ok) {
        return toast({
          title: "Done",
          description: "review added successfully",
        });
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
    <div>
      {isLogin &&
        (user.role === "buyer" ||
          user.role === "seller" ||
          user.role === "admin") && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onReviewSubmit)}
              className="md:gap-6  gap-3 flex flex-col  w-full  relative"
            >
              <h1 className="text-4xl font-bol">Add a Review</h1>
              {/* Rating */}
              <FormField
                control={form.control}
                name={"rating"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-1  items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i: number) => (
                            <>
                              <Star
                                key={i}
                                {...field}
                                className="md:size-10 cursor-pointer"
                                onClick={() => field.onChange(i + 1)}
                                fill={field.value > i ? "yellow" : "none"}
                              />
                            </>
                          ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex  gap-4 items-center">
                {/* Review */}
                <FormField
                  control={form.control}
                  name={"review"}
                  render={({ field }) => (
                    <FormItem className=" w-[100%]">
                      <FormLabel>Review</FormLabel>
                      <FormControl>
                        <Textarea draggable {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                variant={"ghost"}
                className="absolute bottom-0 right-0"
              >
                <SendHorizonal />
              </Button>
            </form>
          </Form>
        )}
    </div>
  );
};

export default AddReview;

const reviewSchema = z.object({
  review: z
    .string()
    .min(5, { message: "review should be atleast 5 charactors" }),
  rating: z
    .number({ message: "invalid rating" })
    .min(1, { message: "invalid rating" })
    .max(5, { message: "invalid rating" }),
});
