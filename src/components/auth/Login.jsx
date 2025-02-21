"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, UserRound, UserRoundCog } from "lucide-react";
import apiPublic from "@/interceptors/axiosInstancePublic";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addAllToCart } from "@/redux/slices/cartSlice";
import axios from "axios";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const existingCartItems = useSelector((state) => state.cart.cartItems);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await apiPublic.post("/auth/login", formData);
      if (res?.data?.success) {
        toast.success("Login Successful");
        console.log(res?.data);
        if (res?.data?.cart) {
          const updateCartRes = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/update-cart`,
            { cartItems: existingCartItems },
            {
              headers: {
                Authorization: `Bearer ${res?.data?.token}`,
              },
            }
          );
          if (updateCartRes?.data?.success) {
            console.log("res", updateCartRes?.data);
            dispatch(addAllToCart(updateCartRes?.data?.data));
          }
        }
        if (res?.data?.data?.role === "admin") {
          setCookie("e_bazar", res?.data?.token);
        } else if (res?.data?.data?.role === "user") {
          setCookie("ebazar", res?.data?.token);
        }
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      return toast.error(
        error?.response?.data?.message || "something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-md px-4 mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-12">
          Login to Your Account
        </h1>
        <div className="grid gap-6">
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData?.email}
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  onChange={handleChange}
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={formData?.password}
                  placeholder="Enter your password"
                  type="password"
                  onChange={handleChange}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  disabled={isLoading}
                  required
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>{" "}
            Google
          </Button>
          <div className="flex gap-4">
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="flex w-full gap-2 items-center"
              onClick={() =>
                setFormData({
                  email: "sadiqur057@gmail.com",
                  password: "123456",
                })
              }
            >
              <UserRound /> Customer Login
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="flex w-full gap-2 items-center"
              onClick={() =>
                setFormData({ email: "admin@gmail.com", password: "123456" })
              }
            >
              <UserRoundCog /> Admin Login
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium hover:underline text-primary"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
