import React from "react";
import { useNavigate } from "react-router-dom";
// Types
import { productCardType } from "@/types/product";

interface Type {
    product: productCardType,
}
const Product: React.FC<Type> = (
    { product }
) => {
    const navigate = useNavigate()

    return (
        <div
            className="lg:h-[60vh] h-96 mt-2  shadow-primary rounded-2xl  shadow-2xl bg-card  sm:w-[48%] md:w-[31%] lg:w-[23%] w-[47%] hover:scale-105 hover:cursor-pointer delay-75 transition-all "
        >
            <img src={product.images[1]} alt="images"
                className=" w-[100%] h-[80%] rounded-2xl"
                onClick={() => navigate(`/products/${product._id}`)}
            />
            <div className="flex justify-around p-1 items-center h-[20%] ">
                <h1>{product.name}</h1>
                <h1>${product.price.toString()}</h1>
            </div>

        </div>
    )
}

export default Product