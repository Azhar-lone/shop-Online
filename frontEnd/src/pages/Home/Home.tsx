import { useState } from "react";

// Components
import { Skeleton } from "@/components/ui/skeleton";

// Custom Components
import Container from "@/components/myUi/Container";
import Product from "@/components/myUi/Product";
import Hero from "./Hero";
import ProductsList from "../Products/ProductsList";
import MyPagination from "@/components/myUi/myPagination";

// Providers
import useProducts from "@/components/context/products-provider";
import useLoading from "@/components/context/loading-provider";

// Types
import { productCardType } from "@/types/product";

const Home = () => {
  const [currentPage] = useState(1);
  const { products, totalPages,setTotalPages } = useProducts();
  const { isLoading } = useLoading();

  return (
    <Container className="gap-5 flex flex-col">
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
        <div className="flex flex-wrap gap-4 px-1 pb-10">
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

      <MyPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setTotalPages}
      />
    </Container>
  );
};

export default Home;
