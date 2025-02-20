import React from "react";
import ProductSectionCart from "./ProductSectionCart";
import ImageComponent from "./ImageComponent";

import { Star } from "lucide-react";
import ViewProduct from "./ViewProduct";
import ProductPriceSection from "./ProductPriceSection";

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200/80 shadow-sm rounded-xl hover:scale-[1.02] scroll-smooth">
      <div className="relative">
        <ImageComponent
          src={product?.image}
          alt={product?.name}
          width={200}
          height={200}
          classNames="p-3 w-full h-48 object-contain object-center mx-auto"
        />
        <p className="absolute bottom-3 right-4 flex gap-2 items-center bg-white shadow-md p-1 rounded-md">
          <Star className="fill-orange-400 text-orange-400 w-5" />
          <span className="font-semibold text-primary">5.0</span>
        </p>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product?.name}</h3>
        <ProductPriceSection price={product?.price} />
        <div className="flex items-center gap-3">
          <ProductSectionCart product={product}/>
          <ViewProduct product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
