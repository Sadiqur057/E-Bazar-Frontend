"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { addToCart as addToCartAction } from "@/redux/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import api from "@/interceptors/axiosInstance";
import { Modal } from "./Modal";

const ViewProduct = ({ product }) => {
  const { symbol, conversionRate } = useFetchCurrencyData();
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [isWishlist, setIsWishlist] = React.useState(false);
  const images = [product.image, product.image, product.image];
  const hasToken = getCookie("ebazar") || getCookie("e_bazar");
  const [IsModalOpen, setIsModalOpen] = React.useState(false);
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
        dispatch(addToCartAction({ product, quantity }));
        toast.success(res?.data?.message);
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        className="px-3"
        variant="outline"
        onClick={() => setIsModalOpen(true)}
      >
        <EyeIcon />
      </Button>
      <Modal
        title={product?.name}
        onClose={handleCloseModal}
        isOpen={IsModalOpen}
        size="xl"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative flex-1">
              <div className="relative max-h-[400px] aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt="Chinese Cabbage"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all hover:border-primary 
                  ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl lg:text-3xl font-semibold">
                  {product?.name}
                </h2>
                {product?.stock > 0 ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    In Stock
                  </span>
                ) : (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-red-800">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-orange-400 text-orange-400 w-5"
                  />
                ))}
                <span className="text-sm text-muted-foreground">
                  (4 Reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {symbol} {(product?.price * conversionRate).toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {symbol}{" "}
                  {(
                    (product?.price + product?.price * 0.1) *
                    conversionRate
                  ).toFixed(2)}
                </span>
                <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                  10% Off
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Brand:</span>
                  No brand
                </div>
              </div>

              <p className="text-muted-foreground">{product?.description}</p>
            </div>

            <Separator />

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-lg">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-12 w-12"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-12 w-12"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>

              <Button
                onClick={addToCart}
                className="h-12 flex-1 gap-2 bg-green-600 text-white hover:bg-green-700"
              >
                Add to Cart
                <ShoppingCart className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12"
                onClick={() => setIsWishlist(!isWishlist)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlist ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-sm font-medium">Category:</span>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Vegetables
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium">Tags:</span>
                {[
                  "Vegetables",
                  "Healthy",
                  "Chinese",
                  "Cabbage",
                  "Green Cabbage",
                ].map((tag) => (
                  <Link
                    key={tag}
                    href="#"
                    className="text-sm text-primary hover:underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* <Dialog>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="w-[90%] sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{product?.name}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </>
  );
};
export default ViewProduct;
