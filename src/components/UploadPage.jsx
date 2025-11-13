"use client";

import { useState } from "react";
import { UploadCloud, Send } from "lucide-react";

const TABS = [
  { key: "general", label: "جنرال", endpoint: "/levels/upload" },
  { key: "class", label: "کلاس", endpoint: "/class-levels/upload" },
  {
    key: "classContent",
    label: "کلاس کانتنت",
    endpoint: "/class-content/upload",
  },
  { key: "classes", label: "کلاسز", endpoint: "/classes/upload" },
  { key: "messages", label: "مسیجز", endpoint: "/messages/upload" },
  { key: "utility", label: "یوتیلیتی", endpoint: "/utility/upload" },
];

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState("general");

  const currentTab = TABS.find((t) => t.key === activeTab);

  return (
    <section className="text-center p-6">
      <h1 className="text-2xl mb-6 text-[#fdb44b] font-semibold">
        آپلود فایل CSV
      </h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              activeTab === key
                ? "bg-[#fdb44b] text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        {currentTab && <UploadTab endpoint={currentTab.endpoint} />}
      </div>
    </section>
  );
}

function UploadTab({ endpoint }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const isCSV =
      selected.type === "text/csv" || selected.name.endsWith(".csv");
    if (!isCSV) return alert("فقط فایل CSV مجاز است!");

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return alert("لطفاً ابتدا فایل را انتخاب کنید.");

    const token = localStorage.getItem("token");
    if (!token) return alert("لطفاً ابتدا وارد حساب کاربری شوید.");

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطا در آپلود فایل");

      alert("فایل با موفقیت ارسال شد!");
      setFile(null);
    } catch (err) {
      alert(`خطا: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#001833]/70 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center border border-[#00bbf0]/40 w-full max-w-md">
      <div className="flex justify-center mb-6">
        <div className="bg-[#00bbf0]/20 p-4 rounded-full">
          <UploadCloud size={48} className="text-[#00bbf0]" />
        </div>
      </div>

      <h2 className="text-xl mb-4 text-[#fdb44b] font-bold">انتخاب فایل CSV</h2>
      <p className="text-sm text-gray-300 mb-6">
        لطفاً فقط فایل‌های با فرمت <span className="text-[#fdb44b]">.csv</span>{" "}
        انتخاب کنید
      </p>

      <label
        htmlFor="csvUpload"
        className="cursor-pointer inline-block bg-[#00bbf0] hover:bg-[#005792] text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
      >
        انتخاب فایل
      </label>
      <input
        id="csvUpload"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
        disabled={loading}
      />

      {file && (
        <p className="mt-4 text-[#00bbf0] text-sm">
          فایل انتخاب‌شده: <span className="font-bold">{file.name}</span>
        </p>
      )}

      {file && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-6 w-full p-3 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition hover:opacity-90 ${
            loading ? "opacity-50 cursor-not-allowed" : "bg-[#fdb44b]"
          }`}
        >
          {loading ? "در حال ارسال..." : "ارسال فایل"} <Send size={18} />
        </button>
      )}
    </div>
  );
}
