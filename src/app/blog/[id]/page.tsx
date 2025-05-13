"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/api";
import { CalendarDays } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      axios.get<Blog>(`/blog/${id}`).then((res) => setBlog(res.data)); // ✅ typed
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-sky-50 to-purple-100">
        <button type="button" disabled>
          <svg
            className="mr-3 h-5 w-5 animate-spin text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading…
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 py-12 px-6">
      <div className="prose prose-lg max-w-3xl mx-auto bg-white rounded-xl p-8 shadow">
        <h1 className="text-4xl font-bold text-indigo-800 leading-tight mb-4 capitalize text-center">
          {blog.title}
        </h1>

        <div className="flex items-center justify-center text-sm text-gray-500 gap-2 mb-6">
          <CalendarDays size={16} />
          <span>
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        <article
          className="text-gray-800 leading-relaxed text-[17px]"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></article>
      </div>
    </div>
  );
}
