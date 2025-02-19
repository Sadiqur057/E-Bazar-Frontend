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
import { Eye } from "lucide-react";
const orders = [
  {
    id: "3933",
    date: "4 April, 2021",
    total: "$135.00",
    products: 5,
    status: "Processing",
  },
  {
    id: "5045",
    date: "27 Mar, 2021",
    total: "$25.00",
    products: 1,
    status: "on the way",
  },
  {
    id: "5028",
    date: "20 Mar, 2021",
    total: "$250.00",
    products: 4,
    status: "Completed",
  },
  {
    id: "4600",
    date: "19 Mar, 2021",
    total: "$35.00",
    products: 1,
    status: "Completed",
  },
  {
    id: "4152",
    date: "18 Mar, 2021",
    total: "$578.00",
    products: 13,
    status: "Completed",
  },
  {
    id: "8811",
    date: "10 Mar, 2021",
    total: "$345.00",
    products: 7,
    status: "Completed",
  },
  {
    id: "3536",
    date: "5 Mar, 2021",
    total: "$560.00",
    products: 2,
    status: "Completed",
  },
  {
    id: "1374",
    date: "27 Feb, 2021",
    total: "$560.00",
    products: 2,
    status: "Completed",
  },
  {
    id: "7791",
    date: "25 Feb, 2021",
    total: "$560.00",
    products: 2,
    status: "Completed",
  },
  {
    id: "4846",
    date: "24 Feb, 2021",
    total: "$23.00",
    products: 1,
    status: "Completed",
  },
  {
    id: "5948",
    date: "20 Feb, 2021",
    total: "$23.00",
    products: 1,
    status: "Completed",
  },
  {
    id: "1577",
    date: "12 Oct, 2020",
    total: "$23.00",
    products: 1,
    status: "Completed",
  },
];
const Orders = () => {
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
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell className="hidden lg:block">
                    {order.date}
                  </TableCell>
                  <TableCell>
                    {order.total}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "on the way"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Eye />
                    </Button>
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
