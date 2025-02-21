"use server";
import Shop from "@/components/shop/Shop";
import React from "react";

const page = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.statusText);
      return <div>Failed to load products.</div>;
    }

    const products = await res.json();
    return <Shop products={products?.data} />;
  } catch (error) {
    console.error("Fetch error:", error);
    return <div>Something went wrong.</div>;
  }
};

export default page;
