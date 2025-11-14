"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const authRoutes = ["/login", "/register"]; // مسیرهای بدون Sidebar

  const shouldShowSidebar = isLoggedIn && !authRoutes.includes(pathname);

  return (
    <html lang="fa">
      <body className=" bg-[#004196] text-white min-h-screen">
        {shouldShowSidebar && <Sidebar />}
        <main className={shouldShowSidebar ? "pt-20 px-6" : ""}>
          {children}
        </main>
      </body>
    </html>
  );
}
