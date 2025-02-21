"use server";

import { BlogSection } from "@/components/home/BlogSection";
import Hero from "@/components/home/Hero";
import { ProductSection } from "@/components/home/ProductSection";
import React from "react";

const page = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product`;

    const res = await fetch(url, { cache: "no-store" }); 
    if (!res.ok) {
      console.error("Failed to fetch products:", res.statusText);
      return (
        <>
          <Hero />
          <div className="text-center text-red-500">Failed to load products.</div>
          <BlogSection />
        </>
      );
    }

    const products = await res.json();

    return (
      <>
        <Hero />
        <ProductSection products={products?.data} />
        <BlogSection />
      </>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <>
        <Hero />
        <div className="text-center text-red-500">Something went wrong.</div>
        <BlogSection />
      </>
    );
  }
};

export default page;
