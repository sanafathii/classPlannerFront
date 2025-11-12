"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return null;

  return <>{children}</>;
}
