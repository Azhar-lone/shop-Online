import React from "react";

// Types
import productType from "/types/product"


const Product: React.FC<productType> = ({
    product
}) => {
    return (
        <div
            className="lg:h-[60vh] h-96 mt-2 border rounded-2xl  shadow-2xl bg-card  sm:w-[48%] md:w-[31%] lg:w-[23%] w-[47%] hover:scale-105 hover:cursor-pointer delay-75 transition-all "
        >
            <img src={product.imgs[0]} alt="images"
                className=" w-[100%] h-[80%] rounded-2xl"
            />
            <div className="flex justify-around p-1 items-center h-[20%] ">
                <h1>{product.name}</h1>
                <h1>${product.price.toString()}</h1>
            </div>

        </div>
    )
}

export default Product