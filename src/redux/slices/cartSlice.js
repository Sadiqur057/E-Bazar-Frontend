"use client";

import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";

const initialState = {
  cartItems: [],
};

if (typeof window !== "undefined") {
  const cartCookie = getCookie("cart");
  if (cartCookie) {
    try {
      initialState.cartItems = JSON.parse(cartCookie);
    } catch (error) {
      console.error("Failed to parse cart cookie:", error);
    }
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
      setCookie("cart", JSON.stringify(state.cartItems));
    },

    addAllToCart: (state, action) => {
      const newProducts = action.payload;
      console.log("chekce", action.payload);
      (state.cartItems = action.payload.products),
        setCookie("cart", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      console.log("called", action.payload);
      const { id, changes } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product._id === id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + changes;
        existingItem.quantity = newQuantity > 0 ? newQuantity : 1;
        setCookie("cart", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload
      );

      setCookie("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      setCookie("cart", JSON.stringify([]));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addAllToCart,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
