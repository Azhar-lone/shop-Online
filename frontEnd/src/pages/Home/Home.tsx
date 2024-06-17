import { useEffect, useState } from 'react';

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
import Hero from './Hero';
import ProductsList from '../Products/ProductsList';

// importing Providers
import useProducts from '@/components/context/products-provider';
import useLoading from '@/components/context/loading-provider';

// types
import { productCardType } from '@/types/product';
const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { products, setProducts, totalProducts, setTotalProducts } = useProducts();
    const { isLoading, setIsLoading } = useLoading();
    const [homeBlog, setHomeBlog] = useState<string>()
    const { toast } = useToast();

    const pagesCount = Math.ceil(totalProducts / 10); // Calculate total pages based on count


    useEffect(() => {
        getTotalProducts()
    }, [])

    useEffect(() => {
        setIsLoading(true);
        getAllProducts(currentPage);

    }, [currentPage]);


    async function getTotalProducts() {
        try {
            setIsLoading(true);

            // what function is going to return
            interface JsonType {
                totalProducts: number;
                msg: string;
            }

            const baseUrl = import.meta.env.VITE_BaseUrl;
            let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/products/count");
            let json: JsonType = await res.json();

            if (res.ok) {
                setTotalProducts(json.totalProducts)
                return
            } else {
                toast({
                    title: 'Error',
                    description: json.msg,
                    variant: 'destructive',
                });
            }

            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    }

    async function getAllProducts(page: number) {
        try {
            setIsLoading(true);

            // what function is going to return
            interface JsonType {
                products: productCardType[];
                msg: string;
            }

            const baseUrl = import.meta.env.VITE_BaseUrl;
            let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/products/?page=" + page);
            let json: JsonType = await res.json();

            if (res.ok) {
                setProducts((prev) => [...prev, ...json.products]);
            } else {
                toast({
                    title: 'Error',
                    description: json.msg,
                    variant: 'destructive',
                });
            }

            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    }

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= pagesCount) {
            setCurrentPage(page);
            getAllProducts(page);
        }
        toast({
            title: (pagesCount.toString()),
            duration: 50000
        });
    };

    return (
        <Container className="p-2">
            <Hero />
            { }

            {!isLoading ? (
                <ProductsList>
                    {products.map((product: productCardType, index: number) => (
                        <Product product={product} key={index} />
                    ))}
                </ProductsList>
            ) : (
                <div className={`flex flex-wrap gap-4 px-1 pb-10`}>
                    {Array(4).fill(0).map((_, index: number) => (
                        <Skeleton key={index} className="lg:h-[60vh] h-96 mt-2 sm:w-[48%] md:w-[31%] lg:w-[23%] w-[47%] hover:scale-105" />
                    ))}
                </div>
            )}

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" aria-disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                    {/* Render 5 page links around the current page */}
                    {Array.from({ length: 5 }, (_, i) => (
                        <PaginationItem key={i + 2}>
                            <PaginationLink href="#" isActive={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            aria-disabled={isLoading || currentPage === pagesCount}
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </Container>
    );
};

export default Home;











