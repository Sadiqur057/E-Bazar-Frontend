"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import AddProduct from "./AddProduct";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import { Modal } from "@/components/shared/Modal";
import ScreenLoader from "@/components/shared/ScreenLoader";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { symbol, conversionRate } = useFetchCurrencyData();

  const fetchProductItems = async () => {
    try {
      setLoading(true);
      const res = await api.get("/product");
      if (res?.data?.success) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductItems();
  }, []);

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      const res = await api.delete(`/product/remove/${id}`);
      if (res?.data?.success) {
        setProducts(res?.data?.data);
        toast.success(res?.data?.message);
        setLoading(false);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleModal = (prev) => {
    setIsDeleteModalOpen(!prev);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Products</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      {loading ? (
        <ScreenLoader />
      ) : products?.length ? (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative w-16 h-16">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {symbol} {conversionRate * product?.price}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setSelectedProductId(product?._id);
                      }}
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="py-10">No Products Found</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Add New Product"}
        size="lg"
      >
        <AddProduct
          closeModal={() => setIsModalOpen(false)}
          setProducts={setProducts}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={"Delete this product"}
      >
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">
            Are you sure want to delete this Product?
          </h3>
          <p className="pb-6">
            The product will be deleted permanently and cannot be retrieve
            again.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleToggleModal}
              className="py-3"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              className="py-3"
              onClick={() => removeProduct(selectedProductId)}
            >
              {loading ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Products;
