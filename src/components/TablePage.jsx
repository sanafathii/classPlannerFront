import { useState, useEffect } from "react";
import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true });

function formatJalali(dateString) {
  if (!dateString) return "-";
  return moment(dateString).format("jYYYY/jMM/jDD HH:mm");
}

function useFetchData(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
        );
        if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
        const result = await res.json();
        setData(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

function DataTable({ columns, data }) {
  if (!data?.length) return <p>داده‌ای موجود نیست.</p>;

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-700">
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
            className={i % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
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

const tabsConfig = {
  general: {
    label: "جنرال",
    endpoint: "/levels?page=1&limit=10",
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
    endpoint: "/class-levels?page=1&limit=10",
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
    endpoint: "/classes?page=1&limit=10",
    columns: [
      { key: "id", label: "ID کلاس" },
      { key: "name", label: "نام کلاس" },
      { key: "teacherName", label: "نام معلم" },
      { key: "chatId", label: "Chat ID" },
      { key: "levelName", label: "نام سطح" },
      { key: "classLevelId", label: "ID سطح" },
      { key: "sessionCount", label: "تعداد جلسات" },
      {
        key: "days",
        label: "روزها",
        render: (val) => val?.join(", "),
      },
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
    component: () => <p>دیتای کلاس کانتنت</p>,
  },
  messages: { label: "مسیجز", component: () => <p>دیتای مسیجز</p> },
  utility: { label: "یوتیلیتی", component: () => <p>دیتای یوتیلیتی</p> },
};

export default function TablePage() {
  const [activeTab, setActiveTab] = useState("general");
  const tab = tabsConfig[activeTab];
  const { data, loading, error } = useFetchData(tab?.endpoint);

  const renderContent = () => {
    if (tab.component) return <tab.component />;

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className="text-red-500">خطا: {error}</p>;

    return <DataTable columns={tab.columns} data={data} />;
  };

  return (
    <section className="text-center p-6">
      <h1 className="text-2xl mb-6 text-[#fdb44b] font-semibold">نمایش جدول</h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {Object.entries(tabsConfig).map(([key, t]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md font-medium transition ${
              activeTab === key
                ? "bg-[#fdb44b] text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-md text-left">
        {renderContent()}
      </div>
    </section>
  );
}
