// 📁 app/editor/page.tsx
"use client";

import dynamic from "next/dynamic";

// ✅ Client-only dynamic import
const EditorPageClient = dynamic(
  () => import("@/components/EditorPageClient"),
  {
    ssr: false,
  }
);

export default function EditorPage() {
  return <EditorPageClient />;
}
