// 📁 frontend/app/dashboard/page.tsx (Improved Blog List + Search)
"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/api";

export default function DashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/blog/user/user123").then((res) => setBlogs(res.data));
  }, []);

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-4">My Blogs</h2>
      <input
        className="border px-3 py-2 mb-6 w-full max-w-md"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded hover:shadow cursor-pointer"
            onClick={() => (window.location.href = `/blog/${blog._id}`)}
          >
            <h3 className="font-semibold text-xl">{blog.title}</h3>
            <p className="text-gray-500 text-sm">
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
