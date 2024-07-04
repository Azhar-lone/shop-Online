import { useEffect, useState } from "react";

// components
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";

import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

// custom components
import Container from "@/components/myUi/Container";
import Product from "@/components/myUi/Product";

// sub pages
import Hero from "./Hero";
import ProductsList from "../Products/ProductsList";

// importing Providers
import useProducts from "@/components/context/products-provider";
import useLoading from "@/components/context/loading-provider";

// types
import { productCardType } from "@/types/product";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, setProducts, totalProducts} =
    useProducts();
  const { isLoading, setIsLoading } = useLoading();
  const { toast } = useToast();
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [length, setLength] = useState<number>(10);
  useEffect(() => {
    setIsLoading(true);
    setPagesCount(Math.ceil(totalProducts / 10));
    if (pagesCount < 10) {
      setLength(pagesCount);
    }
    getAllProducts(currentPage);
  }, []);

 

  async function getAllProducts(page: number) {
    try {
      setIsLoading(true);

      // what function is going to return
      interface JsonType {
        products: productCardType[];
        msg: string;
      }

      const baseUrl = import.meta.env.VITE_BaseUrl;
      let res = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/products/?page=" + page
      );
      let json: JsonType = await res.json();

      if (res.ok) {
        setProducts((prev) => [...prev, ...json.products]);
      } else {
        toast({
          title: "Error",
          description: json.msg,
          variant: "destructive",
        });
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagesCount) {
      setCurrentPage(page);
      getAllProducts(page);
    }
  };

  return (
    <Container className="gap-5 flex flex-col ">
      <Hero />
      {products.length > 0 && !isLoading ? (
        <>
          <h1 className="text-4xl">Products</h1>
          <ProductsList>
            {products.map((product: productCardType, index: number) => (
              <Product product={product} key={index} />
            ))}
          </ProductsList>
        </>
      ) : (
        <div className={`flex flex-wrap gap-4 px-1 pb-10`}>
          {Array(8)
            .fill(0)
            .map((_, index: number) => (
              <Skeleton
                key={index}
                className="lg:h-[60vh] h-96 mt-2 sm:w-[48%] md:w-[31%] lg:w-[23%] w-[47%] hover:scale-105"
              />
            ))}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => {
              if (currentPage <= 1) return;
              handlePageChange(currentPage - 1);
            }}
            className="hover:cursor-pointer "
          />
          {/* Render 10 page links around the current page */}
          {/* {if pages==50 } left side=12345 right side=4647484950*/}
          {}
          {Array(length)
            .fill(0)
            .map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className={`${
                    currentPage === i + 1 &&
                    "bg-primary text-primary-foreground "
                  } hover:cursor-pointer`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationNext
            onClick={() => {
              if (currentPage <= pagesCount) handlePageChange(currentPage + 1);
            }}
            className="hover:cursor-pointer"
          />
        </PaginationContent>
      </Pagination>
    </Container>
  );
};

export default Home;
