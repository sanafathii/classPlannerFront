"use client";

import { Upload, Table } from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logo.jpg";

export default function Sidebar({ page, setPage }) {
  const menuItems = [
    { id: "upload", label: "آپلود فایل", icon: <Upload size={18} /> },
    { id: "table", label: "نمایش جدول", icon: <Table size={18} /> },
  ];

  return (
    <aside className="w-56 border-l-2 border-[#00bbf0] flex flex-col text-right items-end py-6">
      <div className="flex flex-col items-center w-full mb-12">
        <Image
          src={logo}
          alt="لوگو"
          width={120}
          height={120}
          className="rounded-full mb-3 border-2 border-[#00bbf0]"
        />
        <h2 className="text-[#fdb44b] font-semibold text-sm">پنل مدیریت</h2>
      </div>

      <nav className="flex flex-col w-full">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex flex-row-reverse justify-between items-center w-full px-4 py-3 border-b-2 border-[#00bbf0] hover:bg-[#005792] transition text-sm font-medium ${
              page === item.id ? "bg-[#005792]" : ""
            }`}
          >
            <span>{item.label}</span>
            {item.icon}
          </button>
        ))}
      </nav>
    </aside>
  );
}
