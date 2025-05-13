"use client";
import { useState } from "react";
import axios from "@/lib/api";
import toast from "react-hot-toast";

export default function ImageCaptionSuggester() {
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCaption = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/blog/suggest-caption", { description });
      setCaption(res.data.caption);
      toast.success("Image caption generated!");
    } catch {
      toast.error("Failed to generate caption");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="Describe the image..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleCaption}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Generating..." : "Generate Image Caption"}
      </button>
      {caption && (
        <p className="mt-3 text-green-700 font-medium">Caption: {caption}</p>
      )}
    </div>
  );
}
