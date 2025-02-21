"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addToCart as addToCartAction,
  removeFromCart,
} from "@/redux/slices/cartSlice";

import { Badge } from "@/components/ui/badge";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import { useDispatch } from "react-redux";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const { symbol, conversionRate } = useFetchCurrencyData();
  const dispatch = useDispatch();
  const fetchWishListItems = async () => {
    const res = await api.get("/wishlist");
    if (!res?.data?.success) {
      toast.error("Something went wrong");
    }
    if (res?.data?.data) {
      setProducts(res?.data?.data?.products);
    }
  };

  useEffect(() => {
    fetchWishListItems();
  }, []);

  const handleRemove = async (id) => {
    try {
      const res = await api.delete(`/wishlist/remove/${id}`);
      if (!res?.data?.success) {
        toast.error("Unable to delete at this moment.");
      }
      setProducts(res?.data?.data?.products);
      return dispatch(removeFromCart(id));
    } catch (error) {
      console.error(error);
      return toast.error(error?.response?.data?.message|| "something went wrong");
    }
  };

  const findProduct = (id) => products.find((product) => product._id !== id);

  const addToCart = async (id) => {
    console.log("cons", findProduct(id));
    try {
      const res = await api.post("/cart/add", {
        productId: id,
        quantity: 1,
      });
      console.log(res);
      if (!res?.data?.success) {
        toast.error("Something went wrong. try again");
      }
      const product = findProduct(id);
      dispatch(addToCartAction({ product, quantity: 1 }));
      toast.success(res?.data?.message);
    } catch (error) {
      return toast.error(error?.response?.data?.message|| "something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="w-full pb-3">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">My Wishlist</h2>

        <div className="w-full">
          <div className="hidden md:grid grid-cols-10 gap-4 py-4 border-b text-sm font-medium text-gray-500">
            <div className="col-span-4">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Stock Status</div>
            <div className="col-span-2">Actions</div>
          </div>

          <div className="divide-y">
            {products?.map((product) => (
              <div
                key={product?.id}
                className="grid md:grid-cols-10 mb-4 pt-4 md:mb-0 gap-4 md:py-5 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{product?.name}</h3>
                    <div className="md:hidden mt-1 flex items-center gap-2">
                      <Badge
                        variant={product?.stock < 0 ? "success" : "destructive"}
                      >
                        {product?.stock < 0 ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-2 flex items-center">
                  <div>
                    <span className="font-medium">
                      {symbol} {(product?.price * conversionRate).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex col-span-2">
                  <Badge variant={product?.stock ? "success" : "destructive"}>
                    {product?.stock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                <div className="col-span-12 md:col-span-2 flex items-center justify-between gap-2">
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={!product?.stock}
                    variant="default"
                    className="flex-1 md:flex-none"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                  <Button
                    onClick={() => handleRemove(product?._id)}
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

        {products?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Your wishlist is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
