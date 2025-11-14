"use client";

import { useState } from "react";
import { UploadCloud, Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <section className="text-center pt-0 pb-6 px-6 bg-[#004196]">
      <h1 className="text-3xl mb-6 font-bold text-blue-300">آپلود فایل CSV</h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`w-36 text-nowrap px-8 py-2 rounded-xl font-medium transition border ${
              activeTab === key
                ? "bg-[#3DD4FF] text-black border-[#0084DE]"
                : "bg-white text-[#0084DE] border-[#3DD4FF] hover:bg-[#E5F7FF]"
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

    if (endpoint === "/messages/upload") {
      formData.append("classId", "1");
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطا در آپلود فایل");
      toast.success("فایل با موفقیت ارسال شد.");

      setFile(null);
    } catch (err) {
      toast.error(`خطا: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg text-center border border-[#3DD4FF]/60 w-full max-w-md">
      <div className="flex justify-center mb-6">
        <div className="bg-[#E5F7FF] p-4 rounded-full">
          <UploadCloud size={48} className="text-[#0084DE]" />
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h2 className="text-xl mb-3 text-[#0084DE] font-bold">انتخاب فایل CSV</h2>
      <p className="text-sm text-[#0084DE] mb-6">
        لطفاً فقط فایل‌های با فرمت{" "}
        <span className="text-[#3DD4FF] font-bold">.csv</span> انتخاب کنید
      </p>

      <label
        htmlFor="csvUpload"
        className="cursor-pointer inline-block bg-[#3DD4FF] hover:bg-[#0084DE] text-black font-semibold py-2 px-6 rounded-xl shadow-md transition"
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
        <p className="mt-4 text-[#0084DE] text-sm">
          فایل انتخاب‌شده: <span className="font-bold">{file.name}</span>
        </p>
      )}

      {file && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-6 w-full p-3 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#3DD4FF] hover:bg-[#0084DE] text-black"
          }`}
        >
          {loading ? "در حال ارسال..." : "ارسال فایل"}
          <Send size={18} />
        </button>
      )}
    </div>
  );
}
