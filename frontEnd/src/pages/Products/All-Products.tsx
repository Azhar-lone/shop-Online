// dependencies

//Icons
import { ListFilter } from "lucide-react";

// components
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

// custom components
import Container from "@/components/myUi/Container";
import Hint from "@/components/myUi/Hint";
import Product from "@/components/myUi/Product";
import ProductsList from "./ProductsList";
import SearchProducts from "./SearchProducts";
import MyPagination from "@/components/myUi/myPagination";

// importing Providers
import useProducts from "@/components/context/products-provider";
import useLoading from "@/components/context/loading-provider";

// types
import { productCardType } from "@/types/product";

const AllProducts = () => {
  const { isLoading } = useLoading();
  const { products, currentPage, totalPages, setTotalPages } = useProducts();

  return (
    <Container>
      <div className="flex w-[90%] mx-auto justify-end gap-10 p-4 border-b">
        <Hint label="filters">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={true}>
                Name
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Price</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Category</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Hint>
        <SearchProducts />
      </div>

      {products.length > 0 && !isLoading ? (
        <>
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

export default AllProducts;
