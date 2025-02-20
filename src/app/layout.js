import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "E-Bazar - Organic Food Store",
  description: "Fresh & Healthy Organic Food Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
