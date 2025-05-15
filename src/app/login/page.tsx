"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userName = params.get("userName");

    if (accessToken && refreshToken && userName) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_name", userName);

      // Optional: if admin name or email detected, flag admin login
      if (userName.toLowerCase().includes("admin")) {
        localStorage.setItem("admin_logged_in", "true");
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block bg-indigo-100 p-10">
          <img
            src="./login.png"
            alt="Welcome Illustration"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-10 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
            Welcome to AI Blog Assistant
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Sign in with your Google account to continue
          </p>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center cursor-pointer gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded shadow transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="G"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
