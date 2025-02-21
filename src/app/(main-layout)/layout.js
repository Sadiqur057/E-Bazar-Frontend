import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import StoreProvider from "@/redux/Provider";

export const metadata = {
  title: "E-Bazar - Organic Food Store",
  description: "Fresh & Healthy Organic Food Store",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <Navbar />
      <main className="pt-32 md:pt-0">{children}</main>
      <Footer />
    </StoreProvider>
  );
}
