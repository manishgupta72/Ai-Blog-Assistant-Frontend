// 📁 frontend/app/editor/page.tsx (Enhanced Editor with Image Support & Full Toolbar)
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/lib/api";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// 🧠 Dynamically import editor to fix hydration
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function EditorPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const id = searchParams.get("id");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const getHtml = () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(raw);
  };

  useEffect(() => {
    if (topic) {
      axios
        .post("/blog/generate", { topic })
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

          return axios.post("/blog", {
            title: topic,
            content,
            userId: "user123",
          });
        })
        .then((saveRes) => {
          const blogId = saveRes.data._id;
          router.push(`/blog/${blogId}`);
        })
        .catch((err) => console.error("Auto Save Error:", err));
    }

    if (id) {
      axios.get(`/blog/${id}`).then((res) => {
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
  }, [topic, id]);

  const handleUpdate = () => {
    const html = getHtml();
    axios
      .put(`/blog/${id}`, { title, content: html })
      .then(() => {
        toast.success("Blog updated successfully!");
        router.push("/admin/dashboard");
      })
      .catch(() => toast.error("Failed to update blog"));
  };

  const uploadImageCallBack = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { data: { link: res.data.url } };
  };

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        {id ? "Editing Blog:" : "Generating Blog:"} {title}
      </h2>

      <div className="bg-white border rounded-lg shadow p-4">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "emoji",
              "image",
              "remove",
              "history",
            ],
            inline: {
              inDropdown: false,
              options: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "monospace",
              ],
            },
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36],
            },
            fontFamily: {
              options: [
                "Arial",
                "Georgia",
                "Impact",
                "Tahoma",
                "Times New Roman",
                "Verdana",
              ],
            },
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
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
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
