"use client";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import React from "react";

const ProductPriceSection = ({ price }) => {
  const { symbol, conversionRate } = useFetchCurrencyData();
  return (
    <p className="text-green-600 font-semibold mb-4 mt-1">
      {symbol}
      &nbsp;{(price * conversionRate).toFixed(2)}
    </p>
  );
};

export default ProductPriceSection;
