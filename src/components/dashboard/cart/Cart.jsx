"use client";

import { useEffect, useState } from "react";
import demoImg from "@/assets/images/apple.png";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateQuantity } from "@/redux/slices/cartSlice";

const Cart = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const { conversionRate, symbol } = useFetchCurrencyData();

  const fetchCartItem = async () => {
    try {
      const res = await api.get("/cart");
      if (res?.data?.success) {
        setItems(res?.data?.data?.products);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdateQuantity = async (id, changes, currentQuantity) => {
    if (currentQuantity === 1 && changes === -1)
      return toast.error("invalid quantity");
    try {
      const res = await api.patch(`/cart/update-quantity/${id}`, {
        quantity: changes,
      });
      if (res?.data?.success) {
        setItems(res?.data?.data?.products);
        toast.success(res?.data?.message);
        dispatch(updateQuantity({ id, changes }));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const res = await api.delete(`/cart/remove/${id}`);
      if (res?.data?.success) {
        setItems(res?.data?.data?.products);
        toast.success(res?.data?.message);
        removeFromCart(id);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  const subtotal = items?.reduce(
    (sum, item) =>
      sum +
        (item?.product?.price || 0) *
          conversionRate *
          item.quantity.toFixed(2) || 0,
    0
  );

  const shipping = "Free";
  const total = subtotal;

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-semibold mb-12">
        My Shopping Cart
      </h2>

      <div className="gap-8">
        <div>
          <div className="hidden md:grid grid-cols-5 gap-4 pb-4 border-b">
            <div className="col-span-2 text-sm font-medium text-muted-foreground">
              Product
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Price
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Quantity
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Subtotal
            </div>
          </div>
          <div>
            {items?.map((item) => (
              <div
                key={item?._id}
                className="grid md:grid-cols-5 gap-4 items-center py-5 border-b"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item?.product?.image || demoImg}
                      alt={item?.product?.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div>
                      <h3 className="font-medium">{item?.product?.name}</h3>
                      {item?.product?.stock === 0 ? (<span className="bg-red-200/90 rounded-md text-sm px-1 text-red-700">stock out</span>) : ""}
                    </div>
                    <div className="md:hidden mt-1 text-sm text-muted-foreground">
                      {symbol}{" "}
                      {item?.product?.price * conversionRate.toFixed(2) || 0}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block text-muted-foreground">
                  {symbol}{" "}
                  {(item?.product?.price * conversionRate).toFixed(2) || 0}
                </div>

                <div className="flex items-center">
                  <div className="flex items-center rounded-lg">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={item?.quantity <= 1}
                      className="h-8 w-8 rounded-none"
                      onClick={() =>
                        handleUpdateQuantity(
                          item?.product?._id,
                          -1,
                          item?.quantity
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-12 text-center">{item?.quantity}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={item?.product?.stock <= item?.quantity}
                      className="h-8 w-8 rounded-none"
                      onClick={() =>
                        handleUpdateQuantity(
                          item?.product?._id,
                          1,
                          item?.quantity
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="font-medium">
                    {symbol}{" "}
                    {item?.product?.price
                      ? (
                          item?.product?.price *
                          item.quantity *
                          conversionRate
                        ).toFixed(2)
                      : "0.00"}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeItem(item?.product?._id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <div className="rounded-lg w-full sm:w-[380px] pt-6 pb-8 sm:p-6 flex-col flex justify-end">
            <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">
                  {symbol} {subtotal?.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-medium">{shipping}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>
                  {symbol} {total?.toFixed(2)}
                </span>
              </div>
              <Link href={"/dashboard/cart/checkout"}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-4">
                  Proceed to checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
