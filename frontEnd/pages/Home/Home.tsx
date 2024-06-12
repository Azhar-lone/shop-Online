import React, { useEffect, useState } from 'react'



// components
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"



// custom components
import Container from "@/components/myUi/Container"
import Product from "@/components/myUi/Product"

// sub pages
import Hero from './Hero'
import ProductsList from '../Products/ProductsList'

// types
import productType from '../../types/product'


//static data for testing frontEnd
import { products } from "/StaticData/productData"
import { getAllProducts } from '../../api\'s/products/All-products'

const Home = () => {
    const [count, setCount] = useState<number>(1000)
    const [currentPage, setCurrentPage] = useState<number>(0)
    useEffect(() => { }, [])

    return (
        <Container
            className="p-2"
        >
            <Hero />
            <ProductsList>
                {products.map((product: productType, index: number) => (
                    <Product product={product} key={index} />

                ))}
            </ProductsList>






            {/* <Pagination className="p-10">
                <PaginationContent className="flex-wrap justify-center">
                    <PaginationItem>
                        <PaginationPrevious onClick={() => getAllProducts(currentPage + 1)} />
                    </PaginationItem>
                    {Array(Math.ceil(count / 8)).fill(0).map((ele, i) => (

                                <PaginationItem key={i}>
                                    <Button onClick={() => {
                                        getAllProducts(i + 1)
                                        setCurrentPage(i + 1)

                                    }
                                    } key={i}
                                        variant={i ? "ghost" : ""}

                                    >{i + 1}</Button>
                                </PaginationItem >

                    ))}
                    <PaginationItem>
                        {count > 151 &&
                            <PaginationEllipsis />
                        }                 </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => getAllProducts(currentPage + 1)} />
                    </PaginationItem>

                </PaginationContent>
            </Pagination> */}





        </Container >
    )
}

export default Home