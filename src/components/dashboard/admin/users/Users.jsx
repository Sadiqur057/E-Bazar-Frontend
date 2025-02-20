"use client";

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

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user");
      if (res?.data?.success) {
        setUsers(res?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUserItems();
  }, []);
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Users</h2>
      </div>
      {
        loading ? <ScreenLoader/> :
        users?.length ? (
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.phone}</TableCell>
                  <TableCell>
                    <span className={`font-medium p-1 rounded-md ${user?.role==="admin"? "text-primary bg-primary/10": "text-gray-600 bg-gray-50"}`}>{user?.role}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="py-10">No Users Found</p>
        )
      }

    </div>
  );
};
export default Users;
