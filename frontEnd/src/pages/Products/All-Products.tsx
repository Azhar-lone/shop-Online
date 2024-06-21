// dependencies
import { useEffect, useState } from 'react'

//Icons
import { ListFilter } from "lucide-react"

// components
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
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
import Container from "@/components/myUi/Container"
import Search from "@/components/myUi/Search";
import Hint from "@/components/myUi/Hint"
import Product from "@/components/myUi/Product"
import ProductsList from './ProductsList';

// importing Providers
import useProducts from '@/components/context/products-provider';
import useLoading from '@/components/context/loading-provider';



// types
import { productCardType } from '@/types/product'




const AllProducts = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const { products, setProducts, totalProducts, setTotalProducts } = useProducts();
    const { isLoading, setIsLoading } = useLoading();
    const { toast } = useToast();
    const [pagesCount, setPagesCount] = useState<number>(0)
    const [length, setLength] = useState<number>(10)
    useEffect(() => {
        setIsLoading(true);
        setPagesCount(Math.ceil(totalProducts / 10))
        if (pagesCount < 10) {
            setLength(pagesCount)
        }
        getTotalProducts()


        getAllProducts(currentPage);
    }, [])



    async function getTotalProducts() {
        try {

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

    };


    return (
        <Container>
            <div>
                <div className='flex w-[90%] mx-auto justify-end gap-10 p-4 border-b'>
                    <Hint
                        label="filters"
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
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
                                <DropdownMenuCheckboxItem>
                                    Price
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Category
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Hint>
                    <Search />
                </div>

                {products.length>0&&!isLoading ? <div className='w-[100%] border  md:p-4 text-xl flex items-center flex-col'>
                    <ProductsList >
                        {products.map((product: productCardType, index: number) => (
                            <Product product={product} key={index} />

                        ))}

                    </ProductsList>

                </div> :
                    <div className={`flex flex-wrap gap-4 px-1 pb-10`}>
                        {Array(12).fill(0).map((_, index: number) => (
                            <Skeleton key={index} className="lg:h-[60vh] h-96 mt-2 sm:w-[48%] md:w-[31%] lg:w-[23%] w-[47%] hover:scale-105" />
                        ))}
                    </div>}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationPrevious onClick={() => {
                        if (currentPage <= 1)
                            return
                        handlePageChange(currentPage - 1)
                    }}
                        className='hover:cursor-pointer '
                    />
                    {/* Render 10 page links around the current page */}
                    {/* {if pages==50 } left side=12345 right side=4647484950*/}
                    {

                    }
                    {Array(length).fill(0).map((_, i) => (
                        <PaginationItem key={i}>

                            <PaginationLink
                                className={`${currentPage === i + 1 && "bg-primary text-primary-foreground "} hover:cursor-pointer`}
                                onClick={() => handlePageChange((i + 1))}>

                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationNext
                        onClick={() => {
                            if (currentPage <= pagesCount)
                                handlePageChange(currentPage + 1)
                        }}
                        className='hover:cursor-pointer'
                    />
                </PaginationContent>
            </Pagination>
        </Container>
    )
}

export default AllProducts

