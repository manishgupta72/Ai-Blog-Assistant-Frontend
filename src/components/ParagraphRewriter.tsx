"use client";
import { useState } from "react";
import axios from "@/lib/api";
import toast from "react-hot-toast";

export default function ParagraphRewriter() {
  const [paragraph, setParagraph] = useState("");
  const [tone, setTone] = useState("formal");
  const [rewritten, setRewritten] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/blog/rewrite", { paragraph, tone });
      setRewritten(res.data.rewritten);
      toast.success("Paragraph rewritten!");
    } catch {
      toast.error("Failed to rewrite paragraph");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="Enter paragraph to rewrite..."
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
      />
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="mb-2 p-2 border rounded"
      >
        <option value="formal">Formal</option>
        <option value="casual">Casual</option>
        <option value="friendly">Friendly</option>
        <option value="professional">Professional</option>
      </select>
      <button
        onClick={handleRewrite}
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 ml-3"
      >
        {loading ? "Rewriting..." : "Rewrite Paragraph"}
      </button>
      {rewritten && (
        <div className="mt-3 p-4 border rounded bg-gray-50">
          <p className="text-gray-800 whitespace-pre-line">{rewritten}</p>
        </div>
      )}
    </div>
  );
}
