import React from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { Heart } from "lucide-react";

// Types
import { productCardType } from "@/types/product";

interface Type {
  product: productCardType;
}
const Product: React.FC<Type> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="lg:h-[70vh] h-96 mt-2  shadow-primary rounded-2xl  shadow-2xl bg-card  sm:w-[48%] md:w-[31%] lg:w-[23%] w-[98%] hover:scale-105 hover:cursor-pointer delay-75 transition-all ">
      <img
        src={product.images[0]}
        alt="images"
        className=" w-[100%] h-[70%] rounded-2xl p-5 bg-secondary"
        onClick={() => navigate(`/products/${product._id}`, { state: product })}
      />
      <div className="flex justify-around p-3 items-center h-[30%] flex-col">
        <h1>{product.name}</h1>
        <div className="flex justify-between w-full">
          <Heart className="text-red-500" />
          <h1>{product.price.toString()}</h1>
        </div>
      </div>
    </div>
  );
};

export default Product;
