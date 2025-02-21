"use client";

import Link from "next/link";
import { Heart, Leaf, MapPin, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import NavAuth from "./NavAuth";
import CartSection from "./CartSection";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import useFetchCurrencyData from "@/hooks/useFetchCurrencyData";
import { getCookie } from "cookies-next";

const TopBar = () => {
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    const token = getCookie("ebazar") || getCookie("e_bazar");
    setHasToken(!!token); // Convert to boolean
  }, []);
  return (
    <div className="bg-gray-900 text-white py-2.5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="hidden items-center gap-2 text-sm text-gray-200 md:flex">
          <MapPin size={14} />
          <span>Lincoln- 344, Illinois, Chicago, USA</span>
        </div>
        {hasToken ? (
          ""
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <Link href="/login" className="hover:text-primary">
              Login
            </Link>
            <span>/</span>
            <Link href="/register" className="hover:text-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchBar = () => (
  <div className="hidden lg:flex flex-1 max-w-sm mx-8">
    <div className="flex items-center rounded-full">
      <input
        type="text"
        placeholder="Search"
        className="pl-7 h-full outline-none rounded-l-full py-3 border lg:w-80"
      />
      <button className="py-3 h-full bg-primary text-white rounded-full rounded-l-none px-6 hover:bg-primary/80">
        Search
      </button>
    </div>
  </div>
);

const NavigationLinks = ({ className, onClick }) => {
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Shop",
      url: "/shop",
    },
    {
      name: "Pages",
      url: "/",
    },
    {
      name: "Blog",
      url: "/",
    },
    {
      name: "About us",
      url: "/",
    },
    {
      name: "Contact us",
      url: "/",
    },
  ];
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link?.name}>
          <Link
            href={link?.url}
            className="flex h-full items-center hover:text-primary"
            onClick={onClick}
          >
            {link?.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { currency, symbol, conversionRate } = useFetchCurrencyData();

  console.log(currency, symbol, conversionRate);
  return (
    <header className="w-full bg-white fixed md:static top-0 left-0 right-0 z-50">
      <TopBar />
      <div className="">
        <div className="flex items-center justify-between py-4 container">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="!h-8 !w-8" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[300px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col justify-between min-h-[calc(100vh-60px)] ">
                <NavigationLinks
                  className="space-y-4 p-4"
                  onClick={() => setIsOpen(false)}
                />
                <div className="border-t p-4">
                  <NavAuth />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold text-primary">E-Bazar</span>
          </Link>
          <SearchBar />
          <div className="flex items-center">
            <Link
              href="/dashboard/wishlist"
              className="hidden sm:flex items-center gap-2 hover:text-primary pr-4"
            >
              <Heart size={32} />
            </Link>
            <CartSection />
          </div>
        </div>
        <nav className="hidden md:block border-y border-gray-200/60">
          <div className="flex items-center justify-between py-3 container">
            <NavigationLinks className="flex gap-8 h-12" />
            <NavAuth />
          </div>
        </nav>
      </div>
    </header>
  );
}
