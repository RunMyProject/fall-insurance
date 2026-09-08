"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080";
      const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "fall-insurance";
      const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "fall-insurance-frontend";

      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "password",
        username: username,
        password: password,
        scope: "openid",
      });

      const response = await fetch(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      sessionStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) {
        sessionStorage.setItem("refresh_token", data.refresh_token);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

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
          <h1 className="text-2xl font-bold mb-2 text-center text-blue-400">Fall-Insurance Portal</h1>
          <p className="text-sm text-slate-400 mb-6 text-center">Please sign in to access your dashboard</p>

          {error && (
            <div className="mb-4 p-3 bg-red-950 border border-red-800 rounded-md text-red-300 text-xs text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleCustomLogin}>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition duration-200 text-sm shadow-md cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}