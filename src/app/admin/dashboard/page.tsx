// 📁 frontend/app/admin/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/api";
import { CalendarDays, FileText, Trash2, Pen } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (isLoggedIn !== "true") {
      router.push("/admin/login");
    } else {
      fetchBlogs();
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blog");
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to fetch blogs");
    }
  };

  const handleDelete = async (id: string) => {
    toast((t) => (
      <div className="p-4">
        <p className="font-medium mb-2">Delete this blog?</p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              axios.delete(`/blog/${id}`).then(() => {
                setBlogs((prev) => prev.filter((b) => b._id !== id));
                toast.success("Deleted!");
              });
            }}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-6 py-12">
      <button
        onClick={() => {
          localStorage.removeItem("admin_logged_in");
          router.push("/admin/login");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 float-right"
      >
        Logout
      </button>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-indigo-500 mb-6 text-center">
          🛠️ Admin Panel
        </h2>

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
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/editor?id=${blog._id}`)}
                    className="hover:underline cursor-pointer ml-3"
                  >
                    <Pen size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="hover:underline text-red-600  cursor-pointer ml-3"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
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
