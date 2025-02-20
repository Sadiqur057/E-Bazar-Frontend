"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/interceptors/axiosInstance";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/redux/slices/cartSlice";

const CartSection = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { symbol, conversionRate } = useFetchCurrencyData();
  const hasToken = getCookie("ebazar") || getCookie("e_bazar");

  const removeItem = async (id) => {
    if (!hasToken) return dispatch(removeFromCart(id));
    try {
      const res = await api.delete(`/cart/remove/${id}`);
      if (!res?.data?.success) {
        toast.error("Unable to delete at this moment.");
      }
      return dispatch(removeFromCart(id));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later");
    }
  };

  const total = cartItems?.length
    ? cartItems.reduce(
        (sum, item) =>
          sum + item?.product?.price * conversionRate * item.quantity,
        0
      )
    : 0;

  useEffect(() => {
    setCartCount(cartItems?.length || 0);
  }, [cartItems]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-white hover:text-primary mr-4"
        >
          <ShoppingCart className="!h-8 !w-8" />
          <span className="absolute -top-1 -right-1.5 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-sm">
        <SheetHeader className="flex-row mb-6">
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto">
            {cartItems?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b py-4"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item?.product?.image || "/placeholder.svg"}
                    alt={item?.product?.name}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item?.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item?.quantity} × {symbol}{" "}
                    {(item?.product?.price * conversionRate).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0"
                  onClick={() => removeItem(item?.product?._id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">{cartCount} Products</span>
              <span className="font-medium">
                {symbol} &nbsp;
                {total ? total.toFixed(2) : 0}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/cart/checkout">
                <Button
                  variant="outline"
                  className="w-full text-white bg-primary hover:bg-primary/90"
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Button>
              </Link>
              <Link href="/dashboard/cart">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Go To Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSection;
