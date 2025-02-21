"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import api from "@/interceptors/axiosInstance";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { symbol, conversionRate } = useFetchCurrencyData();
  const fetchOrder = async () => {
    try {
      const res = await api.get("/order");
      console.log(res?.data);
      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Something went wrong");
      }
      setOrders(res?.data?.data);
    } catch (error) {
      return toast.error(
        error?.response?.data?.message || "something went wrong"
      );
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="flex-1 w-full pb-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Order History
      </h2>
      <div className="bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="border text-xs md:text-sm lg:text-base">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead className="hidden lg:block py-5">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    #{order._id.slice(0, 6)}...
                  </TableCell>
                  <TableCell className="hidden lg:block">
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {symbol} {(order?.totalAmount * conversionRate).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order?.status === "Shipped"
                          ? "bg-yellow-100 text-yellow-800"
                          : order?.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order?.status === "Confirmed"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order?.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
