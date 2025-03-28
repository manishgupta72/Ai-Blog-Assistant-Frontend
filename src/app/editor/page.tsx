// 📁 frontend/app/editor/page.tsx (Updated to Auto-Save to DB)
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/lib/api";

export default function EditorPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (topic) {
      axios
        .post("/blog/generate", { topic })
        .then((res) => {
          const content = res.data.content;
          setContent(content);
          return axios.post("/blog", {
            title: topic,
            content,
            userId: "user123",
          });
        })
        .then((saveRes) => {
          const blogId = saveRes.data._id;
          router.push(`/blog/${blogId}`); // Redirect to viewer after auto-save
        })
        .catch((err) => console.error("Auto Save Error:", err));
    }
  }, [topic]);

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold mb-4">
        Generating blog for: {topic}
      </h2>
      <p className="text-gray-500">Please wait... auto-saving in progress</p>
    </div>
  );
}
