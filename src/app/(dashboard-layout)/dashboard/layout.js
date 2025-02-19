import Sidebar from "@/components/layout/Dashboard/Sidebar";

export const metadata = {
  title: "E-Bazar - Organic Food Store",
  description: "Fresh & Healthy Organic Food Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="lg:flex">
          <Sidebar />
          <div className="container py-10 lg:p-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
