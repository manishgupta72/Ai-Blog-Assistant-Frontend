import SmartTitleSuggester from "@/components/SmartTitleSuggester";
import ImageCaptionSuggester from "@/components/ImageCaptionSuggester";
import ParagraphRewriter from "@/components/ParagraphRewriter";

export default function AIToolsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          ❌
        </button>

        <h2 className="text-xl font-bold text-indigo-700 mb-4">
          ✨ AI Writing Assistant Tools
        </h2>

        <div className="space-y-10">
          <SmartTitleSuggester content="Enter your content here..." />
          <ImageCaptionSuggester />
          <ParagraphRewriter />
        </div>
      </div>
    </div>
  );
}
