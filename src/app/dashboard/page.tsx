"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/api";
import { CalendarDays, FileText } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get("api/blog/user/user123")
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          router.push("/login");
        }
      });
  }, [router]);

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-indigo-800 mb-5">
          <Typewriter
            words={[
              "My Blog Library",
              "Generate AI-Powered Blogs",
              "Create in Seconds, Not Hours",
            ]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h1>

        <input
          className="border border-gray-300 px-4 py-3 mb-10 w-full max-w-xl mx-auto block rounded-lg shadow-sm focus:ring-2 focus:outline-none focus:ring-blue-300"
          placeholder="🔍 Search blogs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-100 p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer flex flex-col justify-between"
              onClick={() => router.push(`/blog/${blog._id}`)}
            >
              <div className="flex items-start gap-3">
                <div className="text-blue-600">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mt-1">
                    {blog.content.slice(0, 100)}...
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-indigo-500 mt-4">
                <div className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <span className="text-indigo-500 hover:underline">
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <p className="text-center text-gray-400 mt-20">
            No blogs found for this keyword.
          </p>
        )}
      </div>
    </div>
  );
}
