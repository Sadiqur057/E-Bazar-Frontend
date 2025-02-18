"use client";

import Link from "next/link";
import {
  Heart,
  Leaf,
  MapPin,
  Menu,
  Phone,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";

const TopBar = () => (
  <div className="hidden sm:block bg-gray-900 text-white py-2">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2 text-sm text-gray-200">
        <MapPin size={14} />
        <span>Lincoln- 344, Illinois, Chicago, USA</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Link href="/signin" className="hover:text-primary">
          Sign In
        </Link>
        <span>/</span>
        <Link href="/signup" className="hover:text-primary">
          Sign Up
        </Link>
      </div>
    </div>
  </div>
);

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

const CartIcon = () => (
  <Link href="/cart" className="flex items-center gap-3.5 border-l pl-4">
    <div className="relative">
      <ShoppingCart size={32} />
      <span className="absolute -top-1 -right-1.5 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        2
      </span>
    </div>
    <div className="hidden sm:block">
      <p className="text-[13px] mb-1 text-gray-500">Shopping cart:</p>
      <p className="font-medium">$57.00</p>
    </div>
  </Link>
);

const NavigationLinks = ({ className, onClick }) => {
  const links = ["Home", "Shop", "Pages", "Blog", "About Us", "Contact Us"];
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link}>
          <Link
            href={`/${link.toLowerCase().replace(/\s+/g, "")}`}
            className="flex h-full items-center hover:text-primary"
            onClick={onClick}
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white fixed md:static top-0 left-0 right-0 z-50">
      <TopBar />
      <div className="">
        <div className="flex items-center justify-between py-5 container">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold text-primary">E-Bazar</span>
          </Link>
          <SearchBar />
          <div className="flex items-center">
            <Link
              href="/wishlist"
              className="hidden sm:flex items-center gap-2 hover:text-primary pr-4"
            >
              <Heart size={32} />
            </Link>
            <CartIcon />
          </div>
        </div>
        <nav className="hidden md:block border-y  border-gray-200/60">
          <div className="flex items-center justify-between py-3 container">
            <NavigationLinks className="flex gap-8 h-12" />
            <div className="flex gap-2">
              <Phone />
              <p className="font-semibold">(219) 555-0114</p>
            </div>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed left-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl p-4">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                ✖
              </button>
              <h3 className="text-2xl py-4 mb-4">Menu</h3>
              <NavigationLinks
                className="space-y-4"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
