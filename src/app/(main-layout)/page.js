import { BlogSection } from "@/components/home/BlogSection";
import Hero from "@/components/home/Hero";
import { ProductSection } from "@/components/home/ProductSection";
import React from "react";

const page = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
  const res = await fetch(url,{ cache: 'no-cache' });
  const products = await res.json();

  return (
    <>
      <Hero />
      <ProductSection products={products?.data} />
      <BlogSection />
    </>
  );
};

export default page;
