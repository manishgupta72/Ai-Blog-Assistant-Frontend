// frontend/components/BlogCard.tsx
export default function BlogCard({ title }: { title: string }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
}
