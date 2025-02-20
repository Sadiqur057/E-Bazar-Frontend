"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";
import ScreenLoader from "@/components/shared/ScreenLoader";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { conversionRate, symbol } = useFetchCurrencyData();

  const fetchOrderItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/order/all");
      if (res?.data?.success) {
        setOrders(res?.data?.data);
        console.log(res?.data?.data[0]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const status = ["Confirmed", "Processing", "Shipped", "Delivered"];

  const handleStatusChange = async (value, id) => {
    try {
      const res = await api.patch(`/order/update-status/${id}`, {
        status: value,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        const user = res?.data?.data?.user;
        const templateParams = {
          to_email: user?.email,
          to_name: user?.name,
          message: `Congratulations! Your order status has been updated to ${value}.`,
        };
        const emailRes = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
        console.log("checking", emailRes);
        toast.success("Email sent successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Orders</h2>
      </div>
      {loading ? (
        <ScreenLoader />
      ) : orders?.length ? (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">
                  {order?._id.slice(0, 6)}...
                </TableCell>
                <TableCell>{order?.user?.name}</TableCell>
                <TableCell>
                  {symbol} {(order?.totalAmount * conversionRate).toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-1 rounded-md ${
                      order?.paymentStatus === "paid"
                        ? "bg-green-100 text-primary"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order?.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) =>
                      handleStatusChange(value, order?._id)
                    }
                    defaultValue={order?.status}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select order Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {status?.map((item, idx) => (
                          <SelectItem value={item} key={idx}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="py-10">No Orders Found</p>
      )}
    </div>
  );
};
export default AllOrders;
