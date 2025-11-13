"use client";
import { useState } from "react";
import ProtectedLayout from "../components/ProtectedLayout";
import Sidebar from "../components/Sidebar";
import UploadPage from "../components/UploadPage";
import TablePage from "../components/TablePage";

export default function HomePage() {
  const [page, setPage] = useState("upload");

  return (
    <ProtectedLayout>
      <div className="flex flex-row-reverse h-screen bg-[#00204a] text-white">
        <Sidebar page={page} setPage={setPage} />

        <main className="flex-1 p-8 overflow-y-auto">
          {page === "upload" && <UploadPage />}
          {page === "table" && <TablePage />}
        </main>
      </div>
      //{" "}
    </ProtectedLayout>
  );
}
