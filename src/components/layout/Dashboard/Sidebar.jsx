"use client";

import {
  History,
  Heart,
  ShoppingCart,
  LogOut,
  Leaf,
  Home,
  Boxes,
  Users,
} from "lucide-react";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";

const sidebarLinks = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Order History",
    icon: History,
    href: "/dashboard/orders",
  },
  {
    title: "Wishlist",
    icon: Heart,
    href: "/dashboard/wishlist",
  },
  {
    title: "Shopping Cart",
    icon: ShoppingCart,
    href: "/dashboard/cart",
  },
];

const adminLinks = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Products",
    icon: Boxes,
    href: "/dashboard/admin/products",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/admin/users",
  },
  {
    title: "Order",
    icon: History,
    href: "/dashboard/admin/orders",
  },
];

const NavigationLink = () => {
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    setAdmin(getCookie("e_bazar")); 
  }, []);

  const links = admin ? adminLinks : sidebarLinks;
  return links.map((link, index) => (
    <Link
      href={link.href}
      key={index}
      className={`flex items-center lg:space-x-3 w-[20%] lg:w-full justify-center lg:justify-start lg:px-6 lg:py-3 py-4 transition-colors ${
        pathname === link.href
          ? "bg-primary text-white"
          : "text-gray-600 hover:bg-gray-200/80"
      }`}
    >
      <link.icon className="w-5 h-5" />

      <span className="hidden lg:block">{link.title}</span>
    </Link>
  ));
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    deleteCookie("ebazar");
    deleteCookie("e_bazar");
    dispatch(clearCart());
    window.location.reload();
  };

  return (
    <>
      <aside className="min-w-72 bg-gray-50 min-h-screen hidden lg:block shadow-sm py-5 border-r">
        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center pb-5 mb-4 border-b gap-2"
          >
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-3xl font-semibold text-primary">E-Bazar</span>
          </Link>
          <NavigationLink />
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-start space-x-3 px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-200/80 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log-out</span>
          </button>
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around lg:hidden z-50">
        <NavigationLink />
        <button
          onClick={handleLogout}
          className="flex justify-center lg:w-full space-x-3 w-[20%] py-4 rounded-lg text-gray-600 hover:bg-gray-200/80 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden lg:block">Log-out</span>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
