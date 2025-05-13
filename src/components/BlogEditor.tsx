export default function BlogEditor({
  content,
  setContent,
}: {
  content: string;
  setContent: (val: string) => void;
}) {
  return (
    <textarea
      className="w-full h-[500px] p-4 border"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
