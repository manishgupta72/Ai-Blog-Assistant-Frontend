"use client";
import { useState } from "react";
import axios from "@/lib/api";
import toast from "react-hot-toast";

export default function SmartTitleSuggester({ content }: { content: string }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/blog/suggest-title", { content });
      setTitle(res.data.title);
      toast.success("Smart title generated!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleSuggest}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {loading ? "Suggesting..." : "Suggest Title with AI"}
      </button>
      {title && (
        <p className="mt-3 text-blue-700 font-medium">Suggested: {title}</p>
      )}
    </div>
  );
}
