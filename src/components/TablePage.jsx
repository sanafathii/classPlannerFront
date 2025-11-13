"use client";

import { useEffect, useState } from "react";
import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true });

function formatJalali(dateString) {
  if (!dateString) return "-";
  return moment(dateString).format("jYYYY/jMM/jDD HH:mm");
}

const tabsConfig = {
  general: {
    label: "جنرال",
    endpoint: "/levels",
    columns: [
      { key: "name", label: "نام سطح" },
      { key: "code", label: "کد" },
      { key: "description", label: "توضیحات" },
      { key: "notes", label: "یادداشت" },
      {
        key: "createdAt",
        label: "تاریخ ایجاد",
        render: (val) => formatJalali(val),
      },
      {
        key: "updatedAt",
        label: "تاریخ بروزرسانی",
        render: (val) => formatJalali(val),
      },
    ],
  },
  class: {
    label: "کلاس",
    endpoint: "/class-levels",
    columns: [
      { key: "id", label: "ID کلاس" },
      { key: "className", label: "نام کلاس" },
      { key: "levelName", label: "نام سطح" },
      { key: "levelCode", label: "کد سطح" },
      {
        key: "generalLevel",
        label: "نام سطح کلی",
        render: (_, item) => item.generalLevel?.name,
      },
      {
        key: "generalLevelDesc",
        label: "توضیح سطح کلی",
        render: (_, item) => item.generalLevel?.description,
      },
      {
        key: "createdAt",
        label: "تاریخ ایجاد",
        render: (val) => formatJalali(val),
      },
      {
        key: "updatedAt",
        label: "تاریخ بروزرسانی",
        render: (val) => formatJalali(val),
      },
    ],
  },
  classes: {
    label: "کلاسز",
    endpoint: "/classes",
    columns: [
      { key: "id", label: "ID کلاس" },
      { key: "name", label: "نام کلاس" },
      { key: "teacherName", label: "نام معلم" },
      { key: "chatId", label: "Chat ID" },
      { key: "levelName", label: "نام سطح" },
      { key: "classLevelId", label: "ID سطح" },
      { key: "sessionCount", label: "تعداد جلسات" },
      { key: "days", label: "روزها", render: (val) => val?.join(", ") },
      {
        key: "startDate",
        label: "تاریخ شروع",
        render: (val) => formatJalali(val),
      },
      {
        key: "classLevelName",
        label: "نام کلاس سطح",
        render: (_, item) => item.classLevel?.className,
      },
      {
        key: "levelFullName",
        label: "نام سطح کامل",
        render: (_, item) => item.classLevel?.levelName,
      },
      {
        key: "levelCode",
        label: "کد سطح",
        render: (_, item) => item.classLevel?.levelCode,
      },
      {
        key: "createdAt",
        label: "تاریخ ایجاد",
        render: (val) => formatJalali(val),
      },
      {
        key: "updatedAt",
        label: "تاریخ بروزرسانی",
        render: (val) => formatJalali(val),
      },
    ],
  },
  classContent: {
    label: "کلاس کانتنت",
    component: () => {
      const [page, setPage] = useState(1);
      const limit = 10;
      const { data, pagination, loading, error } = useFetchData(
        "/class-contents",
        page,
        limit
      );

      const columns = [
        { key: "id", label: "ID جلسه" },
        { key: "name", label: "نام جلسه" },
        { key: "description", label: "توضیحات" },
        { key: "book", label: "کتاب" },
        {
          key: "classLevelName",
          label: "نام سطح کلاس",
          render: (_, item) => item.classLevel?.className,
        },
        {
          key: "levelName",
          label: "نام سطح",
          render: (_, item) => item.classLevel?.levelName,
        },
        {
          key: "levelCode",
          label: "کد سطح",
          render: (_, item) => item.classLevel?.levelCode,
        },
        {
          key: "className",
          label: "نام کلاس",
          render: (_, item) => item.class?.name,
        },
        {
          key: "createdAt",
          label: "تاریخ ایجاد",
          render: (val) => formatJalali(val),
        },
        {
          key: "updatedAt",
          label: "تاریخ بروزرسانی",
          render: (val) => formatJalali(val),
        },
      ];

      if (loading) return <p className="text-gray-300">در حال بارگذاری...</p>;
      if (error) return <p className="text-red-500">خطا: {error}</p>;
      if (!data.length) return <p>داده‌ای موجود نیست.</p>;

      return (
        <div>
          <DataTable columns={columns} data={data} />
          <Pagination pagination={pagination} onPageChange={setPage} />
        </div>
      );
    },
  },

  messages: {
    label: "مسیجز",
    endpoint: "/class-contents",
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "نام پیام" },
      { key: "classId", label: "ID کلاس" },
      { key: "sessionId", label: "ID جلسه" },
      { key: "sessionName", label: "نام جلسه" },
      { key: "chatId", label: "Chat ID" },
      {
        key: "sendDate",
        label: "تاریخ ارسال",
        render: (val) => formatJalali(val),
      },
      { key: "content", label: "محتوا" },
      { key: "lessonPlanNumber", label: "درس برنامه" },
      { key: "requiredMaterials", label: "مواد مورد نیاز" },
      { key: "homework", label: "تکلیف" },
      {
        key: "homeworkSubmissionDate",
        label: "تاریخ تحویل تکلیف",
        render: (val) => formatJalali(val),
      },
      { key: "status", label: "وضعیت" },
      {
        key: "createdAt",
        label: "تاریخ ایجاد",
        render: (val) => formatJalali(val),
      },
      {
        key: "updatedAt",
        label: "تاریخ بروزرسانی",
        render: (val) => formatJalali(val),
      },
      {
        key: "class",
        label: "کلاس",
        render: (_, item) => item.class?.name || "-",
      },
      {
        key: "session",
        label: "جلسه",
        render: (_, item) => item.session?.name || "-",
      },
    ],
  },
  utility: { label: "یوتیلیتی", component: () => <p>دیتای یوتیلیتی</p> },
};

function useFetchData(endpoint, page, limit) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endpoint}?page=${page}&limit=${limit}`
        );
        if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
        const result = await res.json();
        setData(result.data || []);
        setPagination(result.pagination || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, page, limit]);

  return { data, pagination, loading, error };
}

function DataTable({ columns, data }) {
  if (!data?.length) return <p>داده‌ای موجود نیست.</p>;

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-[#5fc9f3]/70 text-black">
          {columns.map((col) => (
            <th key={col.key} className="border px-4 py-2">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr
            key={item.id || i}
            className={i % 2 === 0 ? "bg-[#d5eeff]/20" : "bg-[#a5bdfd]/20"}
          >
            {columns.map((col) => (
              <td key={col.key} className="border px-4 py-2">
                {typeof col.render === "function"
                  ? col.render(item[col.key], item)
                  : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pagination({ pagination, onPageChange }) {
  if (!pagination.totalPages) return null;

  const { page, totalPages, hasNextPage, hasPrevPage } = pagination;
  const pageNumbers = [];

  pageNumbers.push(1);

  if (page > 4) pageNumbers.push("...");

  for (let i = page - 2; i <= page + 2; i++) {
    if (i > 1 && i < totalPages) pageNumbers.push(i);
  }

  if (page < totalPages - 3) pageNumbers.push("...");
  if (totalPages > 1) pageNumbers.push(totalPages);

  return (
    <div className="flex justify-center gap-2 mt-4 flex-wrap">
      <button
        disabled={!hasPrevPage}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        قبلی
      </button>

      {pageNumbers.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded ${
              p === page ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        بعدی
      </button>
    </div>
  );
}

export default function TablePage() {
  const [activeTab, setActiveTab] = useState("general");
  const [page, setPage] = useState(1);
  const limit = 10;

  const tab = tabsConfig[activeTab];
  const { data, pagination, loading, error } = useFetchData(
    tab?.endpoint,
    page,
    limit
  );

  const renderContent = () => {
    if (tab.component) return <tab.component />;
    if (loading) return <p className="text-gray-300">در حال بارگذاری...</p>;
    if (error) return <p className="text-red-500">خطا: {error}</p>;

    return (
      <>
        <DataTable columns={tab.columns} data={data} />
        <Pagination pagination={pagination} onPageChange={setPage} />
      </>
    );
  };

  useEffect(() => setPage(1), [activeTab]);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center text-[#5fc9f3] mb-6">
        نمایش جدول
      </h1>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {Object.entries(tabsConfig).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-3 rounded-lg font-semibold transition-shadow ${
              activeTab === key
                ? "bg-[#fdb44b] text-black shadow-lg"
                : "bg-[#d5eeff]/30 text-[#001833] hover:bg-[#a5bdfd]/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mx-auto">{renderContent()}</div>
    </section>
  );
}
