"use client";

import { Upload, Table, LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LogoutModal from "./LogoutModal";

export default function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      id: "upload",
      label: "آپلود فایل",
      path: "/upload",
      icon: <Upload size={20} />,
    },
    {
      id: "tables",
      label: "نمایش جدول",
      path: "/tables",
      icon: <Table size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center border-b-2 border-[#3DD4FF] bg-[#003B7F]/60 backdrop-blur-md shadow-lg px-6">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-gray-300 flex items-center hover:text-white transition p-2 rounded-full"
          title="خروج"
        >
          <span className="mr-2">خروج</span>
          <LogOut size={30} />
        </button>

        <div className="flex flex-row-reverse gap-8 py-3">
          {menuItems.map((item) => {
            const active = pathname.startsWith(item.path);

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-3 text-base font-semibold transition px-5 py-3 rounded-lg ${
                  active
                    ? "bg-[#3DD4FF] text-black shadow-md"
                    : "text-gray-300 hover:text-white hover:bg-[#0084DE]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}
