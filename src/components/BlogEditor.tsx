interface Props {
  content: string;
  setContent: (val: string) => void;
}

export default function BlogEditor({ content, setContent }: Props) {
  return (
    <textarea
      className="w-full h-[500px] p-4 border"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
