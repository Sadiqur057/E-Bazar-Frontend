import Navbar from "@/components/layout/Navbar/Navbar";

export const metadata = {
  title: "E-Bazar - Organic Food Store",
  description: "Fresh & Healthy Organic Food Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-32 md:pt-0">{children}</main>
      </body>
    </html>
  );
}
