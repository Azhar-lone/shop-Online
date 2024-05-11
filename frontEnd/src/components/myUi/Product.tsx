import React from "react";


interface ProductProps {
    product: {
        name: String;
        discription?: String;
        category: String;
        price: Number;
        owner?: String;
        likes?: String[];
        inStock?: Number;
        imgs: string[];
    }

}

const Product: React.FC<ProductProps> = ({
    product
}) => {
    return (
        <div
            className="lg:h-[70vh] h-[40vh] mt-2 border rounded-2xl  shadow-2xl bg-card  sm:w-[48%] md:w-[30%] lg:w-[22%] w-[90%]"
        >
            <img src={product.imgs[0]} alt=""
                className=" w-[100%] h-[85%] rounded-2xl"
            />
            <div className="flex justify-around p-2 items-center h-[15%]">
                <h1>{product.name}</h1>
                <h1>${product.price.toString()}</h1>
                <h1>{product.category}</h1>


            </div>

        </div>
    )
}

export default Product