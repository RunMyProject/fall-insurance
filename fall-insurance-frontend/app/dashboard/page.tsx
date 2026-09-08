"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      router.replace("/");
      return;
    }

    const gatewayUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8081";

    fetch(`${gatewayUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(() => {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        router.replace("/");
      });
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    router.replace("/");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-100">
        Loading...
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-slate-100 p-6">
      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-slate-700">
        
        <div className="w-full h-40 relative bg-slate-700">
          <Image
            src="/img/banner.jpeg"
            alt="Fall-Insurance Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-8">
          <h1 className="text-2xl font-bold mb-2 text-center text-blue-400">Protected Dashboard</h1>
          <p className="text-sm text-slate-400 mb-6 text-center">{message}</p>

          <div className="space-y-4">
            <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-md text-emerald-300 text-xs text-center">
              Authenticated via Keycloak
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-medium rounded-md transition duration-200 text-sm shadow-md cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}