"use client";

import React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import apiPublic from "@/interceptors/axiosInstancePublic";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";

const AddProduct = ({ closeModal,setProducts }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.image.files[0];
    if (!file) return;

    setIsSubmitting(true);

    const imageData = new FormData();
    imageData.append("image", file);
    // Convert price and stock to numbers
    const formattedData = {
      ...formData,
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0,
    };

    console.log("Formatted Data:", formattedData);

    try {
      const res = await apiPublic.post(
        process.env.NEXT_PUBLIC_IMG_HOSTING_URL,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!res?.data?.success) {
        throw new Error("Image upload failed");
      }
      setFormData({
        ...formData,
        image: res.data.data.url,
      });
      console.log("Image uploaded successfully:", res.data);

      const productRes = await api.post("/product/add", formattedData);
      if (!productRes?.data?.success) {
        throw new Error("Product not created");
      }
      toast.success(productRes?.data?.message);
      setProducts((prev) => [...prev, productRes?.data?.data]);
      closeModal();
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-3">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            onChange={handleInputChange}
            name="name"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              onChange={handleInputChange}
              name="price"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              onChange={handleInputChange}
              name="stock"
              type="number"
              placeholder="0"
              min="0"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            onChange={handleInputChange}
            name="description"
            placeholder="Enter product description"
            className="min-h-[72px]"
            required
          />
        </div>

        <div className="space-y-4">
          <Label>Product Image</Label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                imagePreview ? "border-green-300" : "border-gray-300"
              }`}
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or WEBP (MAX. 800x400px)
                  </p>
                </div>
              )}
              <input
                id="image-upload"
                name="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                required
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </Button>
      </div>
    </form>
  );
};
export default AddProduct;
