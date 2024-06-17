// dependencies
import { useEffect } from 'react'

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

// custom components
import Container from "@/components/myUi/Container"
import Search from "@/components/myUi/Search";
import Hint from "@/components/myUi/Hint"
import Product from "@/components/myUi/Product"
import ProductsList from './ProductsList';


//static data for testing frontEnd
import { products } from "../../../StaticData/productData"

// types
import productType, { productCardType } from '@/types/product'



const AllProducts = () => {


    useEffect(() => {


    }, [])


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

                <div className='w-[100%] border  md:p-4 text-xl flex items-center flex-col'>
                    <ProductsList >
                        {products.map((product: productCardType, index: number) => (
                            <Product product={product} key={index} />

                        ))}

                    </ProductsList>

                </div>

            </div>
        </Container>
    )
}

export default AllProducts

