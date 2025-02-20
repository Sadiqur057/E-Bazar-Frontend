"use client";
import Sidebar from "@/components/layout/Dashboard/Sidebar";
import StoreProvider from "@/redux/Provider";

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <main className="lg:flex">
        <Sidebar />
        <div className="container py-10 lg:p-10">{children}</div>
      </main>
    </StoreProvider>
  );
}
