"use client";
import React, { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import { addToCart as addToCartAction } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "@/interceptors/axiosInstance";

const ProductSectionCart = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [quantity, setQuantity] = useState(1);
  const hasToken = getCookie("ebazar") || getCookie("e_bazar");
  const incrementQuantity = () =>
    setQuantity((prev) => {
      if (prev >= product.stock) {
        toast.error("You can't add more than the available stock");
        return prev;
      }
      return prev + 1;
    });
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const addToCart = async () => {
    if (!hasToken) {
      const existingCart = cartItems ? cartItems : [];

      const isProductInCart = existingCart.find(
        (item) => String(item?.product?._id) === String(product._id)
      );
      if (isProductInCart) return toast.error("Product already in the cart");

      let updatedCart;

      toast.success("Product added to the cart");
      updatedCart = [...existingCart, { product, quantity }];
      console.log(updatedCart);
      dispatch(addToCartAction({ product, quantity }));
    } else {
      try {
        const res = await api.post("/cart/add", {
          productId: product?._id,
          quantity: quantity,
        });
        console.log(res);
        if (!res?.data?.success) {
          toast.error("Something went wrong. try again");
        }
        toast.success(res?.data?.message);
        dispatch(addToCartAction({ product, quantity }));
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-between flex-1">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 p-0"
          onClick={decrementQuantity}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 p-0"
          onClick={incrementQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button className="px-3.5" onClick={addToCart}>
        <ShoppingCart className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ProductSectionCart;
