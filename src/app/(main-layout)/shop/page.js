import Shop from "@/components/shop/Shop";
import React from "react";

const page = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
  const res = await fetch(url, { cache: "no-cache" });
  const products = await res.json();
  return <Shop products={products?.data} />;
};

export default page;
