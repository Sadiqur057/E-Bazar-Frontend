"use client";
import {
  Boxes,
  Heart,
  History,
  LogOut,
  ShoppingCart,
  User,
  UserRoundCheck,
  UserRoundPen,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie, getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";

const dropdownLinks = [
  {
    title: "My Orders",
    icon: <History />,
    href: "/dashboard/orders",
  },
  {
    title: "Shopping Cart",
    icon: <ShoppingCart />,
    href: "/dashboard/cart",
  },
  {
    title: "Wishlists",
    icon: <Heart />,
    href: "/dashboard/wishlist",
  },
];
const adminDropdownLinks = [
  {
    title: "All Products",
    icon: <Boxes />,
    href: "/dashboard/admin/products",
  },
  {
    title: "Order History",
    icon: <History />,
    href: "/dashboard/admin/orders",
  },
  {
    title: "Manage Users",
    icon: <Users />,
    href: "/dashboard/admin/users",
  },
];
const authLinks = [
  {
    title: "Login",
    icon: <UserRoundCheck />,
    href: "/login",
  },
  {
    title: "Register",
    icon: <UserRoundPen />,
    href: "/register",
  },
];

const links = getCookie("e_bazar")
  ? adminDropdownLinks
  : getCookie("ebazar")
  ? dropdownLinks
  : authLinks;

const hasToken = getCookie("ebazar") || getCookie("e_bazar");

const NavAuth = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    deleteCookie("ebazar");
    deleteCookie("e_bazar");
    dispatch(clearCart());
    window.location.reload();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <p className="cursor-pointer p-3 rounded-full border bg-gray-50 w-fit">
            <User />
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-48 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuGroup>
            {links.map((link, index) => (
              <Link key={index} href={link.href}>
                <DropdownMenuItem>
                  {link.icon}
                  {link.title}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>
          {hasToken ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </>
          ) : (
            ""
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavAuth;
