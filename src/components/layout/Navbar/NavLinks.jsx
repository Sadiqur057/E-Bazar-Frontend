import Link from "next/link";

export const navLinks = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "Pages", href: "/pages" },
  { title: "Blog", href: "/blog" },
];

export function NavLinks() {
  return (
    <nav className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className="text-gray-700 hover:text-green-600 font-medium"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
