// frontend/app/page.tsx
"use client";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
export default function HomePage() {
  const [topic, setTopic] = useState("");

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex flex-col-reverse md:flex-row items-center justify-between px-10 py-16">
      {/* Image Section */}
      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
        <img
          src="/hero-illustration.png"
          alt="AI Writing Assistant"
          className="w-[90%] max-w-[400px]"
        />
      </div>
      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-4">
          <Typewriter
            words={[
              "Start Writing Smarter",
              "Generate AI-Powered Blogs",
              "Create in Seconds, Not Hours",
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h1>
        <p className="text-gray-600 mb-6">
          AI Blog Assistant helps you create high-quality blog content in
          seconds. Just enter a topic and let AI do the rest.
        </p>
        <form
          action="/editor"
          method="get"
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            name="topic"
            placeholder="e.g. Future of AI"
            className="border border-gray-300 px-4 py-3 rounded-lg shadow-sm w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Start Writing
          </button>
        </form>
      </div>
    </div>
  );
}
