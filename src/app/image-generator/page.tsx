"use client";
import { useState } from "react";
import axios from "@/lib/api";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return toast.error("Please enter a prompt");

    setLoading(true);
    try {
      const res = await axios.post("/blog/generate-image", { prompt });
      setImageUrl(res.data.imageUrl);
      toast.success("Image generated successfully!");
    } catch {
      toast.error("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">
          🎨 AI Image Generator
        </h2>
        <h4 className="text-2xl font-bold text-red-600 mb-4">
          This features not working right now , we will provide this feature
          soon !!!
        </h4>
        <p className="mb-6 text-gray-600">
          Generate beautiful blog illustrations using AI
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Sunrise at Varanasi ghats with sadhus and floating diyas"
          className="w-full border border-gray-300 p-4 rounded-lg mb-4"
          rows={4}
        />

        <button
          onClick={handleGenerate}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {imageUrl && (
          <div className="mt-8">
            <Image src="/path.jpg" alt="desc" width={300} height={300} />
          </div>
        )}
      </div>
    </div>
  );
}
