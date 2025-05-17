"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "@/lib/api";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function EditorPageClient() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const id = searchParams.get("id");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const blogCreated = useRef(false);

  const getHtml = () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(raw);
  };

  useEffect(() => {
    if (topic && !id && !blogCreated.current) {
      blogCreated.current = true;
      axios
        .post("/api/blog/generate", { topic })
        .then((res) => {
          const content = res.data.content;
          setTitle(topic);

          const blocksFromHtml = htmlToDraft(content);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);

          return axios.post("/api/blog", {
            title: topic,
            content,
            userId: "user123",
          });
        })
        .then((saveRes) => {
          const blogId = saveRes.data._id;
          router.push(`/blog/${blogId}`); //after generated the blog, redirect to the blog page
        })
        .catch(() => toast.error("Login First  to generate blog"));
    }

    if (id) {
      axios.get(`/api/blog/${id}`).then((res) => {
        setTitle(res.data.title);

        const blocksFromHtml = htmlToDraft(res.data.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      });
    }
  }, [topic, id, router]);

  const handleUpdate = () => {
    const html = getHtml();
    axios
      .put(`/api/blog/${id}`, { title, content: html })
      .then(() => {
        toast.success("Blog updated successfully!");
        router.push("/admin/dashboard");
      })
      .catch(() => toast.error("Failed to update blog"));
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {id ? "Editing Blog:" : "Generating Blog:"} {title}
      </h2>

      <div className="bg-white rounded-lg shadow p-4">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            options: ["inline", "list", "image", "history"],
            inline: {
              inDropdown: false,
              options: ["bold", "italic", "underline"],
            },
            list: {
              inDropdown: false,
              options: ["unordered", "ordered"],
            },
          }}
          wrapperClassName="border border-gray-300 rounded shadow-sm"
          editorClassName="min-h-[300px] px-4 py-2"
          toolbarClassName="border-b"
        />
      </div>

      {id && (
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
