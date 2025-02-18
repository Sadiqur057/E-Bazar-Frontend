"use client";
import React, { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
const ProductSectionCart = () => {
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const addToCart = () => {
    console.log(`Added (s) to cart`);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={decrementQuantity}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={incrementQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button className="bg-primary hover:bg-primary/90" onClick={addToCart}>
        <ShoppingCart className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ProductSectionCart;
