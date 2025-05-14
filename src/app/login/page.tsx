"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userName = params.get("userName");

    if (accessToken && refreshToken && userName) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_name", userName); // ✅ Save user name
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section */}
        <div className="hidden md:block bg-indigo-100 p-10">
          <img
            src="./login.png"
            alt="Welcome Illustration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Login Section */}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 33.5 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l6.1-6.1C34.5 5.2 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.3-7.6 20.7-17.5.2-1.1.3-2.1.3-3 0-1.1-.1-2.1-.4-3z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.3 15.1 18.8 12 24 12c3.1 0 5.9 1.2 8.1 3.1l6.1-6.1C34.5 5.2 29.6 3 24 3c-7.4 0-13.9 3.2-18.4 8.3z"
              />
              <path
                fill="#4CAF50"
                d="M24 45c5.3 0 10.1-1.8 13.8-4.8l-6.4-5.3C29.2 36.5 26.7 37.5 24 37.5c-5.4 0-9.9-3.5-11.5-8.3l-6.6 5.1C9.6 41.7 16.3 45 24 45z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.5 4.3-5.5 7.5-10.3 7.5-5.4 0-9.9-3.5-11.5-8.3l-6.6 5.1C9.6 41.7 16.3 45 24 45c10.5 0 19.3-7.6 20.7-17.5.2-1.1.3-2.1.3-3 0-1.1-.1-2.1-.4-3z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
