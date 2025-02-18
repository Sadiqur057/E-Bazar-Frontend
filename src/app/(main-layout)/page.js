import { BlogSection } from "@/components/home/BlogSection";
import Hero from "@/components/home/Hero";
import { ProductSection } from "@/components/home/ProductSection";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <ProductSection />
      <BlogSection />
      <Footer />
    </>
  );
};

export default page;
