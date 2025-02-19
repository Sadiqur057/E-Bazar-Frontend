"use client";
import demoImg from "@/assets/images/apple.png";
import { useState } from "react";
import Image from "next/image";
import {
  X,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

const Wishlist = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Green Capsicum",
      price: 14.99,
      originalPrice: 20.99,
      image:
        "",
      inStock: true,
    },
    {
      id: 2,
      name: "Chinese Cabbage",
      price: 45.0,
      image:
        "",
      inStock: true,
    },
    {
      id: 3,
      name: "Fresh Sujapuri Mango",
      price: 9.0,
      image:
        "",
      inStock: false,
    },
  ]);

  const handleRemove = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleAddToCart = (product) => {
    if (!product.inStock) return;
  };

  return (
    <div className="w-full pb-3">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          My Wishlist
        </h2>

        <div className="w-full">
          <div className="hidden md:grid grid-cols-10 gap-4 py-4 border-b text-sm font-medium text-gray-500">
            <div className="col-span-4">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Stock Status</div>
            <div className="col-span-2">Actions</div>
          </div>

          <div className="divide-y">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid md:grid-cols-10 mb-4 pt-4 md:mb-0 gap-4 md:py-5 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={product.image || demoImg}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="md:hidden mt-1 flex items-center gap-2">
                      <Badge
                        variant={product.inStock ? "success" : "destructive"}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-2 flex items-center">
                  <div>
                    <span className="font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex col-span-2">
                  <Badge variant={product.inStock ? "success" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                <div className="col-span-12 md:col-span-2 flex items-center justify-between gap-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    variant="default"
                    className="flex-1 md:flex-none"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                  <Button
                    onClick={() => handleRemove(product.id)}
                    variant="outline"
                    className="text-gray-500 px-3  hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Your wishlist is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
