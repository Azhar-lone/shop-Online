import React from 'react'


// custom components
import Container from "@/components/myUi/Container"
import Product from "@/components/myUi/Product"

// sub pages
import Hero from './Hero'
import ProductsList from '../Products/ProductsList'

//static data for testing frontEnd
import { products } from "/StaticData/productData"

const Home = () => {
    return (
        <Container>
            <Hero />
            <ProductsList>
                {products.map((product, index) => (
                    <Product product={product} key={index}/>

                ))}
            </ProductsList>

        </Container>
    )
}

export default Home