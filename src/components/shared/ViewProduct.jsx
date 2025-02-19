"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import ImageComponent from "./ImageComponent";
import demoImg from "@/assets/images/apple.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ViewProduct = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [isWishlist, setIsWishlist] = React.useState(false);
  const images = [demoImg, demoImg];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-3" variant="outline">
            <EyeIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Product details</DialogTitle>
          </DialogHeader>
          <div className="mx-auto py-8 max-h-[80vh] overflow-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="relative flex-1">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image
                      src={images[selectedImage] || "/placeholder.svg"}
                      alt="Chinese Cabbage"
                      fill
                      className="object-cover"
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
                        src={demoImg || "/placeholder.svg"}
                        alt={`Product thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl lg:text-3xl font-semibold">
                      Chinese Cabbage
                    </h2>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      In Stock
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-muted-foreground">
                      (4 Reviews)
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      $17.28
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      $48.00
                    </span>
                    <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                      64% Off
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

                  <p className="text-muted-foreground">
                    Class aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel
                    consequat nec, ultrices et ipsum. Nulla varius magna a
                    consequat pulvinar.
                  </p>
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

                  <Button className="h-12 flex-1 gap-2 bg-green-600 text-white hover:bg-green-700">
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
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ViewProduct;
