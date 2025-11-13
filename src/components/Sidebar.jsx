"use client";

import { Upload, Table, LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "./LogoutModal";

export default function Sidebar({ page, setPage }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: "upload", label: "آپلود فایل", icon: <Upload size={20} /> },
    { id: "table", label: "نمایش جدول", icon: <Table size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutModal(false);
    router.push("/login");
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center border-b-2 border-[#00bbf0] bg-[#001833]/60 backdrop-blur-md shadow-lg px-6">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-gray-300 flex items-center hover:text-white transition p-2 rounded-full"
          title="خروج"
        >
          <span className="mr-2">خروج</span>

          <LogOut size={30} />
        </button>

        <div className="flex flex-row-reverse gap-8 py-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex items-center gap-3 text-base font-semibold transition px-5 py-3 rounded-lg ${
                page === item.id
                  ? "bg-[#00bbf0] text-black"
                  : "text-gray-300 hover:text-white hover:bg-[#005792]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
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
