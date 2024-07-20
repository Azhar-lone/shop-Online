import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

// components
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
// custom Components
import Container from "@/components/myUi/Container";
import User from "@/components/myUi/User";
//Types
import productType from "@/types/product";

// Static data
import { staticProduct } from "@/static/Products";
// context

// pages
import Reviews from "@/pages/Reviews/Reviews";
import AddReview from "../Reviews/AddReview";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [product, setProduct] = useState<productType>(staticProduct);
  const [bannerImg, setBannerImg] = useState<string>(location.state.images[0]);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_BaseUrl;
      interface JsonType {
        msg: string;
        product: productType;
      }
      let response = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/products/" + id
      );
      let json: JsonType = await response.json();
      setIsLoading(false);

      if (response.ok) {
        setProduct({
          ...location.state,
          ...json.product,
        });
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
  // async function getRelatedProducts() {
  //   try {
  //     setIsLoading(true);
  //     const baseUrl = import.meta.env.VITE_BaseUrl;
  //     interface JsonType {
  //       msg: string;
  //       products: productCardType;
  //     }
  //     let response = await fetch(
  //       import.meta.env.VITE_BackendUrl + baseUrl + "/products/related/" + id
  //     );
  //     let json: JsonType = await response.json();
  //     setIsLoading(false);

  //     if (response.ok) {
  //       return;
  //     }

  //     return toast({
  //       title: "error",
  //       description: json.msg,
  //       variant: "destructive",
  //     });
  //   } catch (error: any) {
  //     toast({
  //       title: "error",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //     setIsLoading(false);
  //   }
  // }

  return (
    <Container>
      {product.name !== "" && !isLoading ? (
        <div className="flex flex-col gap-4 p-5 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Image Section */}
            <div className="flex gap-4 flex-col md:w-[60%] ">
              <img
                src={bannerImg}
                alt="Banner Image"
                className="w-[100%] h-96 rounded transition-all hover:scale-105 border"
              />
              <div className="flex gap-2 md:w-[100%]">
                {product.images.map((img: string, i: number) => (
                  <img
                    src={img}
                    alt={"img"}
                    key={i}
                    className="w-44 h-20 md:h-32 rounded transition-all hover:scale-105 border  hover:cursor-pointer"
                    onClick={() => setBannerImg(img)}
                  />
                ))}
              </div>
            </div>
            {/* Product Info section */}
            <div className="flex mx-auto flex-col gap-4 md:w-[39%] md:p-24">
              <h1 className="text-3xl">{product.name}</h1>
              <h1 className="text-2xl font-light">{product.category}</h1>
              <h1 className="text-2xl  w-fit">
                {/* In Stock : {product.inStock.toString()} Items */}
              </h1>
              <h1 className="text-2xl ">
                addedOn : {product.createdAt.toDateString()}
              </h1>
            </div>
          </div>

          <User user={product.owner} />

          {/* product discription */}
          <div>
            <h3 className="text-3xl">Description</h3>
            <p className="md:p-4 pt-2">{product.discription}</p>
          </div>

          {/* Reviews */}
          <AddReview productId={product._id} />
          <Reviews productId={product._id} />
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row gap-2 p-5  ">
            {/* images*/}
            <div className="flex gap-4 flex-col md:w-[60%]">
              <Skeleton className="w-[100%] h-96 " />
              <div className="flex gap-2 md:w-[100%]">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton className="w-44 h-20 md:h-32" key={i} />
                  ))}
              </div>
            </div>
            {/* product info */}
            <div className="flex  flex-col gap-4 md:w-[39%]">
              {/* product Name */}
              <Skeleton className=" w-[100%] h-16" />
              {/* price */}
              <Skeleton className=" w-[100%] h-16" />
              {/* category */}
              <Skeleton className=" w-[100%] h-16" />
              {/* in stock */}
              <Skeleton className=" w-[100%] h-16" />
              <Skeleton className=" w-[100%] h-16" />
            </div>
          </div>
          {/* owner Info */}
          <div className="flex gap-2 items-center">
            <Skeleton className=" md:h-24 md:w-24 w-16 h-16 rounded-full" />
            <Skeleton className=" h-12 w-[40%] " />
          </div>
          {/* product discription */}
          <div className="flex flex-col gap-5 p-2">
            {/* Title */}
            <Skeleton className=" w-[100%] h-16" />
            {/* discription */}
            <Skeleton className="w-[100%] h-96" />
          </div>
          {/* Related Products */}
          <div className="flex gap-2 justify-center">
            <Skeleton className=" h-48 w-[24%] " />
            <Skeleton className=" h-48 w-[24%] " />
            <Skeleton className=" h-48 w-[24%] " />
            <Skeleton className=" h-48 w-[24%] " />
          </div>
        </div>
      )}
    </Container>
  );
};
export default ProductDetail;
