import React from "react";

// Types
import productType from "/types/product"


const Product: React.FC<productType> = ({
    product
}) => {
    return (
        <div
            className="lg:h-[70vh] h-[40vh] mt-2 border rounded-2xl  shadow-2xl bg-card  sm:w-[48%] md:w-[30%] lg:w-[23%] w-[90%] "
        >
            <img src={product.imgs[0]} alt=""
                className=" w-[100%] h-[85%] rounded-2xl"
            />
            <div className="flex justify-around p-2 items-center h-[15%]">
                <h1>{product.name}</h1>
                <h1>${product.price.toString()}</h1>
            </div>

        </div>
    )
}

export default Product