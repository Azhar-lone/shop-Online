// dependencies
import React, { useEffect, useState } from 'react'

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
import { products } from "/StaticData/productData"
// api's 
import { getCategories } from '../../api\'s/products/All-products'

// types
import { CategorizedProducts } from '../../types/product'


let Categories: CategorizedProducts[] = [{ category: "Mobile Phones", products: products }, { category: "Mobile Phones", products: products },
{ category: "Mobile Phones", products: products },]

const AllProducts = () => {

    const [categories, setCategories] = useState<string>()
    const [CategorizedProducts, setCategorizedProducts] = useState<CategorizedProducts[]>([])
    useEffect(() => {
        getCategories().then((cate) => {
            if (cate !== 1) {
                setCategories(cate)
                return
            }
        }).catch((err) => {
            console.log(err)
        })
        setCategorizedProducts(Categories)

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
                    <Search
                        hidden="block"
                    />
                </div>

                {CategorizedProducts.map((Category, i) => (
                    <div className='w-[100%] border  p-5 text-xl flex items-center flex-col'>
                        <h1 className='font-medium p-3 w-[100%] border-b text-center'>{Category.category}</h1>
                        <ProductsList >
                            {Category.products.map((product, index) => (
                                <Product product={product} key={index} />

                            ))}

                        </ProductsList>
                    </div>))}
                {/* <div className='w-[100%] border p-5 text-xl flex items-center flex-col'>
                    <h1 className='font-medium p-3 w-[50%] border-b text-center'>Mobile Phones</h1>
                    <ProductsList >
                        {products.map((product, index) => (
                            <Product product={product} key={index} />

                        ))}

                    </ProductsList> */}
                {/* </div> */}

            </div>
        </Container>
    )
}

export default AllProducts






