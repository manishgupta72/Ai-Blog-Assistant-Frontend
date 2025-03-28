// 📁 frontend/app/blog/[id]/page.tsx (Pretty Blog Viewer)
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/api";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/blog/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  if (!blog) return <div className="p-10">Loading blog...</div>;

  return (
    <div className="prose mx-auto p-10 max-w-3xl">
      <h1>{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Published: {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <article className="whitespace-pre-line leading-relaxed">
        {blog.content}
      </article>
    </div>
  );
}
