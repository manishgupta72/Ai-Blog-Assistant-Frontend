// frontend/app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch("http://localhost:4000/api/blog/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_API_TOKEN ?? "",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
