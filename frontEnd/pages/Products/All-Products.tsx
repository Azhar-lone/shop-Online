// dependencies
import React from 'react'

//Icons
import { Sword } from "lucide-react"

// components

// custom components
import Container from "@/components/myUi/Container"
import Search from "@/components/myUi/Search";
import Hint from "@/components/myUi/Hint"
import Product from "@/components/myUi/Product"
import ProductsList from './ProductsList';
//static data for testing frontEnd
import { products } from "/StaticData/productData"


const AllProducts = () => {
    return (
        <Container>
            <div>
                <div className='flex w-[90%] mx-auto justify-end gap-10 p-4 border-b'>
                    <Hint
                        label="filters"
                    >
                        <button><Sword /> </button>
                    </Hint>
                    <Search
                    hidden="block"
                    />
                </div>
                <ProductsList >
                    {products.map((product, index) => (
                        <Product product={product} />

                    ))}

                </ProductsList>
            </div>
        </Container>
    )
}

export default AllProducts