import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// Types
import { productCardType } from "@/types/product";

import useLoading from "./loading-provider";

interface ProductsContextType {
  products: productCardType[];
  setProducts: Dispatch<SetStateAction<productCardType[]>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const initialState: ProductsContextType = {
  products: [],
  setProducts: () => [],
  totalPages: 0,
  setTotalPages: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
};

const ProductsContext = createContext<ProductsContextType>(initialState);

export default function useProducts() {
  return useContext(ProductsContext);
}

interface Provderprops {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<Provderprops> = ({ children }) => {
  let { setIsLoading } = useLoading();
  const [products, setProducts] = useState<productCardType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCache, setPageCache] = useState<{
    [key: number]: productCardType[];
  }>({});

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchTotalProducts();
  }, []);

  const fetchTotalProducts = async () => {
    try {
      // what function is going to return
      interface JsonType {
        count: number;
        msg: string;
      }

      const baseUrl = import.meta.env.VITE_BaseUrl;
      let response = await fetch(
        `${import.meta.env.VITE_BackendUrl}${baseUrl}/products/count`
      );
      let data: JsonType = await response.json();
      if (response.ok) {
        setTotalPages(data.count / 20);
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProducts = async (page: number) => {
    try {
      setIsLoading(true);

      if (pageCache[page]) {
        // If data is already cached, use cached data
        setProducts(pageCache[page]);
      } else {
        // Fetch data from the server
        // what function is going to return
        interface JsonType {
          products: productCardType[];
          msg: string;
        }

        const baseUrl = import.meta.env.VITE_BaseUrl;
        let response = await fetch(
          `${
            import.meta.env.VITE_BackendUrl
          }${baseUrl}/products/?page=${page}&limit=20`
        );
        let data: JsonType = await response.json();
        setIsLoading(false);
        if (response.ok) {
          const fetchedProducts = data.products;
          setProducts(fetchedProducts);
          setPageCache((prevCache) => ({
            ...prevCache,
            [page]: fetchedProducts,
          }));
        } else {
          setIsLoading(false);
          throw new Error(data.msg);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        setTotalPages,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
