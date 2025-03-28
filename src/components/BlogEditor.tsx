// frontend/components/BlogEditor.tsx
export default function BlogEditor({ content, setContent }: any) {
  return (
    <textarea
      className="w-full h-[500px] p-4 border"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
