import Image from "next/image";
import React from "react";
import ProductSectionCart from "./ProductSectionCart";

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200/80 shadow-sm rounded-xl hover:scale-[1.02] scroll-smooth">
      <Image
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        width={200}
        height={200}
        className="w-full p-3 h-48 object-contain object-center"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-green-600 font-bold mb-2">
          ${product.price.toFixed(2)}
        </p>
        <ProductSectionCart />
      </div>
    </div>
  );
};

export default ProductCard;
