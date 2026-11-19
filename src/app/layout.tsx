import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Walaalaha Restaurant - ERP & POS System",
  description: "Enterprise Restaurant & Event Management System for Walaalaha Restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen bg-slate-50 text-slate-900"
        suppressHydrationWarning
      >
        <Sidebar />
        <div className="lg:pl-64 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
