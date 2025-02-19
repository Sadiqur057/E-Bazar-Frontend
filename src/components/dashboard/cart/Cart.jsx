"use client";

import { useState } from "react";
import demoImg from "@/assets/images/apple.png";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Green Capsicum",
      price: 14.0,
      quantity: 5,
      image: "",
    },
    {
      id: 2,
      name: "Red Capsicum",
      price: 14.0,
      quantity: 1,
      image: "",
    },
  ]);

  const updateQuantity = (id, change) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
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
            {items.map((item) => (
              <div
                key={item.id}
                className="grid md:grid-cols-5 gap-4 items-center py-5 border-b"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item.image || demoImg}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="md:hidden mt-1 text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block text-muted-foreground">
                  ${item.price.toFixed(2)}
                </div>

                <div className="flex items-center">
                  <div className="flex items-center rounded-lg">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-12 text-center">{item.quantity}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Total */}
        <div className="flex justify-end mt-8">
          <div className="rounded-lg w-full sm:w-[380px] pt-6 pb-8 sm:p-6 flex-col flex justify-end">
            <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-medium">{shipping}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
