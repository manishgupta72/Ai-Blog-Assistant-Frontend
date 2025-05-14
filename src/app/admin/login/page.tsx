// ✅ frontend/app/admin/login/page.tsx (Admin Login Page)
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (isLoggedIn === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = () => {
    if (password === "blogadmin7244") {
      localStorage.setItem("admin_logged_in", "true");
      router.push("/admin/dashboard");
    } else {
      toast.error("Incorrect password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white shadow-xl items-center justify-center gap-8 bg-gradient-to-br from-indigo-50 via-white to-blue-100 ">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <Image
          src="/admin-panel.png"
          alt="Admin Illustration"
          width={400}
          height={300}
          className="rounded-lg "
        />
        <div className="bg-white p-8 rounded-xl  max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Admin Panel Login
          </h2>
          <p className="text-red-600 mb-6 text-center">blogadmin7244</p>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="border border-gray-300 px-4 py-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
