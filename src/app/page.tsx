// frontend/app/page.tsx
export default function HomePage() {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold">AI Blog Assistant</h1>
      <p className="text-lg mt-4">Enter a topic to generate your blog</p>
      <form action="/editor" method="get" className="mt-6">
        <input
          type="text"
          name="topic"
          placeholder="e.g. Future of AI"
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Writing
        </button>
      </form>
    </div>
  );
}
